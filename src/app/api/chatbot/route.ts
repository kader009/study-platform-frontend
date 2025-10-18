import { Session } from '@/types/routeSession';
import { NextResponse } from 'next/server';

function extractTutorNames(sessions: Session[]): string[] {
  console.log('Extracting tutors from sessions:', sessions.length);

  const tutors = sessions
    .map((session) => {
      console.log('Session data:', JSON.stringify(session, null, 2));

      if (session.tutorName && typeof session.tutorName === 'string') {
        return session.tutorName;
      }

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
        const title = (
          s.sessionTitle ||
          s.title ||
          s.subject ||
          ''
        ).toLowerCase();
        const match = title.includes('react');
        console.log(`Session "${s.sessionTitle}" matches React:`, match);
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
      const nextSessions = allSessions.filter((s) => {
        const title = (
          s.sessionTitle ||
          s.title ||
          s.subject ||
          ''
        ).toLowerCase();
        return title.includes('next');
      });

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
      const tsSessions = allSessions.filter((s) => {
        const title = (
          s.sessionTitle ||
          s.title ||
          s.subject ||
          ''
        ).toLowerCase();
        return title.includes('type') || title.includes('typescript');
      });

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
        // Get unique subjects from sessionTitle
        const subjects = [
          ...new Set(
            allSessions.map((s) => {
              const title = s.sessionTitle || s.title || s.subject || '';
              // Extract main subject from title (e.g., "React" from "React for Beginners")
              const words = title.split(' ');
              return words[0] || title;
            })
          ),
        ].filter(Boolean);

        // Show some session titles
        const sessionTitles = allSessions
          .slice(0, 5)
          .map((s) => s.sessionTitle || s.title || s.subject)
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
    // Tutor queries (including "who teaches X")
    else if (
      lowerMessage.includes('tutor') ||
      lowerMessage.includes('teacher') ||
      lowerMessage.includes('who teaches') ||
      lowerMessage.includes('which teacher') ||
      lowerMessage.includes('instructor')
    ) {
      console.log('Processing tutor query...');
      console.log('Total sessions to extract tutors from:', allSessions.length);

      // Check if asking about specific subject
      let specificSubject = '';
      if (lowerMessage.includes('react')) specificSubject = 'react';
      else if (lowerMessage.includes('next')) specificSubject = 'next';
      else if (
        lowerMessage.includes('typescript') ||
        lowerMessage.includes('ts')
      )
        specificSubject = 'typescript';
      else if (
        lowerMessage.includes('javascript') ||
        lowerMessage.includes('js')
      )
        specificSubject = 'javascript';
      else if (lowerMessage.includes('python')) specificSubject = 'python';
      else if (lowerMessage.includes('mongodb')) specificSubject = 'mongodb';
      else if (lowerMessage.includes('redux')) specificSubject = 'redux';

      if (specificSubject) {
        // Filter sessions by subject
        const subjectSessions = allSessions.filter((s) => {
          const title = (
            s.sessionTitle ||
            s.title ||
            s.subject ||
            ''
          ).toLowerCase();
          return title.includes(specificSubject);
        });

        if (subjectSessions.length > 0) {
          const tutors = extractTutorNames(subjectSessions);
          if (tutors.length > 0) {
            const sessionsList = subjectSessions
              .map(
                (s, i) =>
                  `${i + 1}. ${s.sessionTitle || s.title} - ${
                    tutors[i] || 'Unknown'
                  }`
              )
              .join('\n');
            response = `${
              specificSubject.charAt(0).toUpperCase() + specificSubject.slice(1)
            } sessions taught by:\n\n${sessionsList}`;
          } else {
            response = `Found ${subjectSessions.length} ${specificSubject} sessions, but tutor info is not available.`;
          }
        } else {
          response = `No ${specificSubject} sessions found currently.`;
        }
      } else {
        // General tutor query
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
    }
    // Greetings
    else if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      response =
        'Hello! Welcome to EduNest. Ask me about courses, tutors, or pricing!';
    }
    // How are you
    else if (
      lowerMessage.includes('how are you') ||
      lowerMessage.includes('কেমন আছ') ||
      lowerMessage.includes('কেমন আছেন')
    ) {
      response =
        "I'm doing great! Thanks for asking 😊 I'm here to help you find the perfect learning session. What would you like to know?";
    }
    // What are you doing
    else if (
      lowerMessage.includes('what are you doing') ||
      lowerMessage.includes('কি করছ') ||
      lowerMessage.includes('কি করছেন')
    ) {
      response =
        "I'm here assisting students like you! Ready to help you explore our courses, tutors, and sessions. How can I assist you today?";
    } else if (
      lowerMessage.includes('time') ||
      lowerMessage.includes('সময়') ||
      lowerMessage.includes('what time')
    ) {
      // Get current UTC time - server timezone
      const now = new Date();

      // Format with timezone info
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short',
      });

      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      response = `Server Time: ${timeString}\nDate: ${dateString}\n\nNote: This is the server time. Your local time may differ based on your timezone. Perfect time to explore our learning sessions! 🕒`;
    } else if (
      lowerMessage.includes('how many session') ||
      lowerMessage.includes('total session') ||
      lowerMessage.includes('কত session') ||
      lowerMessage.includes('কতগুলো session')
    ) {
      response = `We currently have ${allSessions.length} learning sessions available across various subjects! Want to explore them?`;
    }
    // Specific course price by name
    else if (
      lowerMessage.match(/price of|cost of|fee of|এর দাম|এর ফি/) ||
      (lowerMessage.includes('price') && allSessions.length > 0)
    ) {
      const matchedSession = allSessions.find((s) => {
        const title = (
          s.sessionTitle ||
          s.title ||
          s.subject ||
          ''
        ).toLowerCase();
        const words = title.split(' ');
        // Check if any significant word from title appears in message
        return words.some(
          (word) => word.length > 3 && lowerMessage.includes(word.toLowerCase())
        );
      });

      if (matchedSession) {
        const title =
          matchedSession.sessionTitle ||
          matchedSession.title ||
          matchedSession.subject;
        const price =
          matchedSession.registrationFee ||
          matchedSession.price ||
          matchedSession.fee;
        const priceText = price ? `$${price}` : 'Contact for pricing';
        response = `${title} - Registration Fee: ${priceText}. Want more details about this session?`;
      } else {
        const prices = allSessions
          .map((s) => s.registrationFee || s.price || s.fee)
          .filter((p): p is number => p !== undefined && p > 0);

        if (prices.length > 0) {
          const avg = Math.round(
            prices.reduce((a, b) => a + b, 0) / prices.length
          );
          response = `Overall prices range: $${Math.min(
            ...prices
          )} - $${Math.max(
            ...prices
          )}. Average: $${avg}. Ask about a specific course for exact pricing!`;
        } else {
          response = 'Check Sessions page for pricing details.';
        }
      }
    }
    // Check if asking for specific session details by title
    else {
      console.log('Checking for specific session match...');

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

        const description =
          matchedSession.sessionDescription ||
          matchedSession.description ||
          'No description available';

        const price =
          matchedSession.registrationFee ||
          matchedSession.price ||
          matchedSession.fee;
        const priceText = price ? `$${price}` : 'Contact for pricing';

        const duration =
          matchedSession.sessionDuration ||
          matchedSession.duration ||
          'Not specified';

        const rating = matchedSession.averageRating || matchedSession.rating;
        const ratingText = rating ? `${rating}★` : 'No ratings yet';

        // Build response with all available data
        let detailedResponse = `${title}\n\n`;
        detailedResponse += `Tutor: ${tutorName}\n`;

        if (matchedSession.tutorEmail) {
          detailedResponse += `Email: ${matchedSession.tutorEmail}\n`;
        }
        detailedResponse += `\n`;

        if (rating) {
          detailedResponse += `Rating: ${ratingText}\n\n`;
        }

        detailedResponse += `${description}\n\n`;

        const regStart =
          matchedSession.registrationStartDate ||
          matchedSession.registrationStart;
        const regEnd =
          matchedSession.registrationEndDate || matchedSession.registrationEnd;
        const classStart =
          matchedSession.classStartDate || matchedSession.classStart;
        const classEnd = matchedSession.classEndDate || matchedSession.classEnd;

        if (regStart) {
          detailedResponse += `Registration Start: ${new Date(
            regStart
          ).toLocaleDateString()}\n`;
        }
        if (regEnd) {
          detailedResponse += `Registration End: ${new Date(
            regEnd
          ).toLocaleDateString()}\n\n`;
        }

        if (classStart) {
          detailedResponse += `Class Start: ${new Date(
            classStart
          ).toLocaleString()}\n`;
        }
        if (classEnd) {
          detailedResponse += `Class End: ${new Date(
            classEnd
          ).toLocaleString()}\n\n`;
        }

        detailedResponse += `Duration: ${duration} hours\n`;
        detailedResponse += `Registration Fee: ${priceText}\n\n`;

        if (matchedSession.reviews && matchedSession.reviews.length > 0) {
          detailedResponse += `Reviews (${matchedSession.reviews.length}):\n`;
          matchedSession.reviews.slice(0, 3).forEach((review, index) => {
            // Handle both string and object format
            let reviewText = '';
            let reviewRating = '';

            if (typeof review === 'string') {
              // Direct string review (your database format)
              reviewText = review;
            } else if (typeof review === 'object') {
              // Object format review
              reviewText = review.text || review.comment || 'No comment';
              reviewRating = review.rating ? ` (${review.rating}★)` : '';
            }

            if (reviewText.trim()) {
              detailedResponse += `${
                index + 1
              }. ${reviewText}${reviewRating}\n`;
            }
          });
          detailedResponse += `\n`;
        } else {
          detailedResponse += `Reviews: No reviews yet\n\n`;
        }

        detailedResponse += `Visit our Sessions page to book this session!`;

        console.log('Extracted data:', {
          title,
          tutorName,
          priceText,
          duration,
          rating: ratingText,
        });

        response = detailedResponse;
      } else {
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
