import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RequestForm from "../components/api/RequestForm";
import Response from "../components/api/Response";
import Loader from "../components/common/Loader";
import { testApi } from "../services/apiTestService";

const ApiTester = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [initialRequest, setInitialRequest] = useState(null);

  useEffect(() => {
    if (location.state && location.state.request) {
      setInitialRequest(location.state.request);
    }
  }, [location.state]);

  const handleSend = async (requestData) => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await testApi(requestData);
      setResponse(res);
      // History is saved automatically by the backend endpoint
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
          API Tester
        </h1>
        <p className="text-gray-500 text-sm">
          Send requests and view responses in real-time.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <RequestForm
              onSend={handleSend}
              loading={loading}
              initialRequest={initialRequest}
            />
          </div>

          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-8">
            <div className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Response
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader />
              </div>
            ) : (
              <Response response={response} error={error} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
