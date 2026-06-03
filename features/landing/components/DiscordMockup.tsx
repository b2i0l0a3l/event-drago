export default function DiscordMockup() {
  return (
    <div className="w-full max-w-lg mx-auto rounded-xl overflow-hidden bg-[#313338] shadow-2xl border border-[#1e1f22] overflow-x-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#2b2d31] border-b border-[#1e1f22]">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm font-semibold text-[#dbdee1]"># drago-events</span>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
            DE
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-blue-400">DragoEvent</span>
              <span className="text-[10px] bg-[#5865f2] text-white px-1 rounded text-center">BOT</span>
              <span className="text-xs text-[#949ba4]">Today at 2:34 PM</span>
            </div>
            <div className="rounded-md overflow-hidden border-l-4 border-emerald-500 bg-[#2b2d31] max-w-sm">
              <div className="p-3">
                <p className="text-sm font-semibold text-white mb-1">🔔 New Event: 💰 Sales</p>
                <p className="text-xs text-[#dbdee1] mb-2">A new purchase has been completed!</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#949ba4]">Plan</span>
                    <p className="text-white font-medium">PRO</p>
                  </div>
                  <div>
                    <span className="text-[#949ba4]">Amount</span>
                    <p className="text-white font-medium">$49.99</p>
                  </div>
                  <div>
                    <span className="text-[#949ba4]">Email</span>
                    <p className="text-white font-medium">john@doe.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
            DE
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-blue-400">DragoEvent</span>
              <span className="text-[10px] bg-[#5865f2] text-white px-1 rounded text-center">BOT</span>
              <span className="text-xs text-[#949ba4]">Today at 2:36 PM</span>
            </div>
            <div className="rounded-md overflow-hidden border-l-4 border-blue-500 bg-[#2b2d31] max-w-sm">
              <div className="p-3">
                <p className="text-sm font-semibold text-white mb-1">🔔 New Event: 👤 User Signup</p>
                <p className="text-xs text-[#dbdee1] mb-2">A new user just registered!</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#949ba4]">Name</span>
                    <p className="text-white font-medium">Sarah K.</p>
                  </div>
                  <div>
                    <span className="text-[#949ba4]">Source</span>
                    <p className="text-white font-medium">Google</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}