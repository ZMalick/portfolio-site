"use client";

import dynamic from "next/dynamic";

// The chat pulls in the Vercel AI SDK — by far the largest client chunk. It
// sits below the fold, so we code-split it: the landing page becomes
// interactive without parsing the SDK up front, and the console hydrates on
// its own. The skeleton reserves the same height so nothing shifts.
const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
  loading: () => <ChatSkeleton />,
});

function ChatSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-line-bright" />
        <span className="h-3 w-3 rounded-full bg-line-bright" />
        <span className="h-3 w-3 rounded-full bg-line-bright" />
        <span className="ml-3 font-mono text-xs text-faint">
          ask-zaid · llama-3.3-70b
        </span>
      </div>
      <div className="min-h-[15rem] p-5 sm:p-6">
        <p className="font-mono text-sm text-faint" aria-live="polite">
          Loading the assistant…
        </p>
      </div>
      <div className="border-t border-line bg-ink px-4 py-3 font-mono text-sm text-faint">
        &gt; Ask a question…
      </div>
    </div>
  );
}

export default function ChatLazy() {
  return <Chat />;
}
