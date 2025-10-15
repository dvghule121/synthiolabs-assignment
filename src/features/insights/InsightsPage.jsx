export default function InsightsPage() {
  return (
    <div className="flex flex-1 h-[calc(100vh-104px)] overflow-hidden px-4 pb-4 pt-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Insights</h1>
          <p className="text-lg text-gray-600 mb-8">
            AI-powered insights and analytics
          </p>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
            <p className="text-gray-700">
              This is a placeholder for the Insights page.
              <br />
              Here you'll find AI-generated insights, conversation analysis, and
              smart recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
