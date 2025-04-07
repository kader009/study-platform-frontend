interface PageProps {
  params: {
    sessionId: string;
  };
}

const page = async ({ params }: PageProps) => { 
  const sessionCatch = await fetch(
    `http://localhost:5000/api/v1/session/${params.sessionId}`
  );

  const Datas = await sessionCatch.json();
  return (
    <div className="my-8 mx-5">
      <div className="max-w-lg w-full mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-700">
          {Datas.sessionTitle}
        </h2>
        <p className="text-md font-semibold text-gray-700">
          <span className="font-bold">Tutor:</span> {Datas.tutorName}
        </p>
        <div className="flex items-center gap-2 text-gray-700">
          Rating:
          {Datas?.averageRating ? (
            <span className="font-medium text-yellow-500">
              {Datas?.averageRating}★
            </span>
          ) : (
            <span className="text-yellow-500">⭐ No ratings yet</span>
          )}
        </div>
        <p className="text-gray-600">{Datas.sessionDescription}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <span className="font-bold">Registration Start:</span>{' '}
            {Datas.registrationStartDate}
          </p>
          <p>
            <span className="font-bold">Registration End:</span>{' '}
            {Datas.registrationEndDate}
          </p>
          <p>
            <span className="font-bold">Class Start:</span>{' '}
            {new Date(Datas.classStartDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Class End:</span>{' '}
            {new Date(Datas.classEndDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Duration:</span> {Datas.sessionDuration} hours
          </p>
          <p>
            <span className="font-bold">Fee:</span> ${Datas?.registrationFee}
          </p>
        </div>

        <div>
          <p className="font-bold text-gray-800">Reviews:</p>
          {Datas?.reviews?.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {Datas.reviews.map((review: string, index: number) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>

        <button className="w-36 bg-purple-700 text-white font-semibold py-2 rounded-lg hover:bg-purple-800">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default page;
