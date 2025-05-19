import { usePWA } from "../hooks/usePWA";

export const PWAPrompt = () => {
  const { needRefresh, offlineReady, canInstall, installPWA, updatePWA } =
    usePWA();

  if (!needRefresh && !offlineReady && !canInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {canInstall && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 max-w-sm">
          <h3 className="text-lg font-semibold mb-2">Install Word Trainer</h3>
          <p className="text-gray-600 mb-4">
            Install our app for a better experience and offline access.
          </p>
          <button
            onClick={installPWA}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Install
          </button>
        </div>
      )}

      {needRefresh && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 max-w-sm">
          <h3 className="text-lg font-semibold mb-2">Update Available</h3>
          <p className="text-gray-600 mb-4">
            A new version is available. Click update to get the latest features.
          </p>
          <button
            onClick={updatePWA}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Update
          </button>
        </div>
      )}

      {offlineReady && (
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="text-lg font-semibold mb-2">Ready for Offline</h3>
          <p className="text-gray-600">The app is now ready for offline use.</p>
        </div>
      )}
    </div>
  );
};
