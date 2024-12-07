export function TaskHeader() {
  return (
    <div className="p-8 pb-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back!</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's a list of your tasks for this month!
          </p>
        </div>
        <button className="rounded-full bg-background size-8 flex items-center justify-center border border-border/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
