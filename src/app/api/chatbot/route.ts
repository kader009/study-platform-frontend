import { NextResponse } from 'next/server';

// Define types
interface Session {
  _id: string;
  title?: string;
  sessionTitle?: string;
  subject: string;
  description?: string;
  price?: number;
  fee?: number;
  duration?: string;
  date?: string;
  time?: string;
  registrationStart?: string;
  registrationEnd?: string;
  classStart?: string;
  classEnd?: string;
  rating?: number;
  reviews?: Array<{ text: string; rating?: number }>;
  tutor?: {
    _id?: string;
    name: string;
    email?: string;
  };
  tutorId?: {
    _id?: string;
    name: string;
    email?: string;
  };
}

// Helper function to extract tutor names (handles multiple field formats)
function extractTutorNames(sessions: Session[]): string[] {
  console.log('Extracting tutors from sessions:', sessions.length);

  const tutors = sessions
    .map((session) => {
      console.log('Session data:', JSON.stringify(session, null, 2));

      // Try different possible field names
      if (session.tutor) {
        if (typeof session.tutor === 'string') {
          return session.tutor;
        }
        if (session.tutor.name) {
          return session.tutor.name;
        }
      }
      if (session.tutorId) {
        if (typeof session.tutorId === 'string') {
          return session.tutorId;
        }
        if (session.tutorId.name) {
          return session.tutorId.name;
        }
      }

      // Check other possible field names
      const sessionData = session as unknown as Record<string, unknown>;
      if (sessionData.instructor) {
        return typeof sessionData.instructor === 'string'
          ? sessionData.instructor
          : (sessionData.instructor as { name?: string }).name || null;
      }
      if (sessionData.teacher) {
        return typeof sessionData.teacher === 'string'
          ? sessionData.teacher
          : (sessionData.teacher as { name?: string }).name || null;
      }
      if (sessionData.createdBy) {
        return typeof sessionData.createdBy === 'string'
          ? sessionData.createdBy
          : (sessionData.createdBy as { name?: string }).name || null;
      }

      console.log('No tutor found for session:', session._id);
      return null;
    })
    .filter((name): name is string => name !== null && name.trim() !== '');

  const uniqueTutors = [...new Set(tutors)];
  console.log('Extracted tutors:', uniqueTutors);
  return uniqueTutors;
}

// Helper function to parse API response
function parseApiResponse<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }
  if (data && typeof data === 'object' && 'data' in data) {
    const response = data as { data: unknown };
    if (Array.isArray(response.data)) {
      return response.data as T[];
    }
  }
  return [];
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const lowerMessage = message.toLowerCase();

    console.log('Chatbot received:', message);

    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://study-platform-backend-drxm.onrender.com/api/v1';

    let response = '';

    // Fetch all sessions
    const sessionsRes = await fetch(`${baseUrl}/session`, {
      cache: 'no-store',
    });

    if (!sessionsRes.ok) {
      throw new Error(`API error: ${sessionsRes.status}`);
    }

    const sessionsData = await sessionsRes.json();
    const allSessions = parseApiResponse<Session>(sessionsData);

    console.log('Fetched sessions:', allSessions.length);
    console.log('Sample session:', allSessions[0]);

    // React queries
    if (lowerMessage.includes('react') || lowerMessage.includes('reactjs')) {
      console.log('Processing React query...');

      const reactSessions = allSessions.filter((s) => {
        const match = s.subject?.toLowerCase().includes('react');
        console.log(`Session "${s.subject}" matches React:`, match);
        return match;
      });

      console.log('React sessions found:', reactSessions.length);

      if (reactSessions.length > 0) {
        const tutors = extractTutorNames(reactSessions);
        console.log('React tutors:', tutors);

        if (tutors.length > 0) {
          response = `We have ${
            reactSessions.length
          } React sessions available. Our React tutors: ${tutors.join(
            ', '
          )}. Want to know more?`;
        } else {
          response = `We have ${reactSessions.length} React sessions available, but tutor information is not loaded. Please visit our Sessions page for complete details.`;
        }
      } else {
        response =
          'No React sessions available right now. Try checking our Sessions page for updates!';
      }
    }
    // Next.js queries
    else if (lowerMessage.includes('next') || lowerMessage.includes('nextjs')) {
      const nextSessions = allSessions.filter((s) =>
        s.subject?.toLowerCase().includes('next')
      );

      if (nextSessions.length > 0) {
        const tutors = extractTutorNames(nextSessions);
        if (tutors.length > 0) {
          response = `We have ${
            nextSessions.length
          } Next.js sessions. Tutors: ${tutors.join(', ')}.`;
        } else {
          response = `We have ${nextSessions.length} Next.js sessions available.`;
        }
      } else {
        response = 'No Next.js sessions available currently.';
      }
    }
    // TypeScript queries
    else if (
      lowerMessage.includes('typescript') ||
      lowerMessage.includes('ts')
    ) {
      const tsSessions = allSessions.filter((s) =>
        s.subject?.toLowerCase().includes('type')
      );

      if (tsSessions.length > 0) {
        const tutors = extractTutorNames(tsSessions);
        if (tutors.length > 0) {
          response = `${
            tsSessions.length
          } TypeScript sessions available. Tutors: ${tutors.join(', ')}.`;
        } else {
          response = `${tsSessions.length} TypeScript sessions available.`;
        }
      } else {
        response = 'No TypeScript sessions right now.';
      }
    }
    // All sessions
    else if (
      lowerMessage.includes('all session') ||
      lowerMessage.includes('show session') ||
      lowerMessage.includes('list session') ||
      lowerMessage.includes('session')
    ) {
      if (allSessions.length > 0) {
        const subjects = [...new Set(allSessions.map((s) => s.subject))];

        // Show some session titles
        const sessionTitles = allSessions
          .slice(0, 5)
          .map((s) => s.title || s.sessionTitle || s.subject)
          .filter(Boolean);

        if (sessionTitles.length > 0) {
          response =
            `We have ${allSessions.length} sessions!\n\n` +
            `Subjects: ${subjects.join(', ')}\n\n` +
            `Popular sessions:\n` +
            sessionTitles.map((t, i) => `${i + 1}. ${t}`).join('\n') +
            `\n\nAsk about any session for details!`;
        } else {
          response = `${allSessions.length} sessions available: ${subjects.join(
            ', '
          )}. Which interests you?`;
        }
      } else {
        response = 'No sessions available at the moment.';
      }
    }
    // Tutor queries
    else if (
      lowerMessage.includes('tutor') ||
      lowerMessage.includes('teacher') ||
      lowerMessage.includes('name')
    ) {
      console.log('Processing tutor query...');
      console.log('Total sessions to extract tutors from:', allSessions.length);

      const allTutors = extractTutorNames(allSessions);
      console.log('Extracted all tutors:', allTutors);

      if (allTutors.length > 0) {
        response = `Our tutors: ${allTutors.join(
          ', '
        )}. Visit Sessions page to see their courses.`;
      } else {
        // Fallback: Try to fetch tutors from user API
        console.log('No tutors from sessions, trying user API...');
        try {
          const tutorsRes = await fetch(`${baseUrl}/user?role=tutor`, {
            cache: 'no-store',
          });

          if (tutorsRes.ok) {
            const tutorsData = await tutorsRes.json();
            const tutorsList = parseApiResponse<{ name: string }>(tutorsData);

            if (tutorsList.length > 0) {
              const tutorNames = tutorsList.map((t) => t.name);
              response = `Our tutors: ${tutorNames.join(
                ', '
              )}. Check Sessions page for details!`;
            } else {
              response =
                'We have tutors but their information is being updated. Please check Sessions page.';
            }
          } else {
            response =
              'Tutor information is temporarily unavailable. Visit Sessions page for details.';
          }
        } catch (error) {
          console.error('Error fetching tutors:', error);
          response =
            'Unable to fetch tutor information right now. Please visit Sessions page.';
        }
      }
    }
    // Price queries
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      const prices = allSessions
        .map((s) => s.price)
        .filter((p): p is number => p !== undefined && p > 0);

      if (prices.length > 0) {
        const avg = Math.round(
          prices.reduce((a, b) => a + b, 0) / prices.length
        );
        response = `Prices: $${Math.min(...prices)} - $${Math.max(
          ...prices
        )}. Average: $${avg}.`;
      } else {
        response = 'Check Sessions page for pricing details.';
      }
    }
    // Greetings
    else if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      response =
        'Hello! Welcome to EduNest. Ask me about courses, tutors, or pricing!';
    }
    // Check if asking for specific session details by title
    else {
      console.log('Checking for specific session match...');

      // Try to find session by title match
      const matchedSession = allSessions.find((s) => {
        const sessionTitle = (
          s.title ||
          s.sessionTitle ||
          s.subject ||
          ''
        ).toLowerCase();
        return sessionTitle && lowerMessage.includes(sessionTitle);
      });

      if (matchedSession) {
        console.log('Found matching session:', matchedSession);
        console.log(
          'Session full data:',
          JSON.stringify(matchedSession, null, 2)
        );

        const tutors = extractTutorNames([matchedSession]);
        const tutorName = tutors.length > 0 ? tutors[0] : 'Not specified';

        const title =
          matchedSession.title ||
          matchedSession.sessionTitle ||
          matchedSession.subject;

        const price = matchedSession.price || matchedSession.fee;
        const priceText = price ? `$${price}` : 'Contact for pricing';

        const duration = matchedSession.duration || 'Not specified';
        const rating = matchedSession.rating
          ? `${matchedSession.rating}★`
          : 'No ratings yet';
        const description =
          matchedSession.description || 'No description available';

        // Build response with all available data
        let detailedResponse = `${title}\n\n`;
        detailedResponse += `Tutor: ${tutorName}\n\n`;

        if (matchedSession.rating) {
          detailedResponse += `Rating: ${rating}\n\n`;
        }

        detailedResponse += `${description}\n\n`;

        if (matchedSession.registrationStart) {
          detailedResponse += `Registration Start: ${matchedSession.registrationStart}\n`;
        }
        if (matchedSession.registrationEnd) {
          detailedResponse += `Registration End: ${matchedSession.registrationEnd}\n\n`;
        }

        if (matchedSession.classStart) {
          detailedResponse += `Class Start: ${matchedSession.classStart}\n`;
        }
        if (matchedSession.classEnd) {
          detailedResponse += `Class End: ${matchedSession.classEnd}\n\n`;
        }

        detailedResponse += `Duration: ${duration}\n`;
        detailedResponse += `Fee: ${priceText}\n\n`;

        if (matchedSession.reviews && matchedSession.reviews.length > 0) {
          detailedResponse += `Reviews:\n`;
          matchedSession.reviews.slice(0, 2).forEach((review) => {
            detailedResponse += `• ${review.text}\n`;
          });
          detailedResponse += `\n`;
        }

        detailedResponse += `Visit our Sessions page to book this session!`;

        console.log('Extracted data:', {
          title,
          tutorName,
          priceText,
          duration,
          rating,
        });

        response = detailedResponse;
      } else {
        // Default response
        response =
          'Ask me: "Who teaches React?", "Show sessions", "What are the prices?", or mention a specific session title for details!';
      }
    }

    console.log('Response:', response);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      {
        response:
          'Sorry, something went wrong. Please try again or visit Sessions page.',
      },
      { status: 500 }
    );
  }
}
