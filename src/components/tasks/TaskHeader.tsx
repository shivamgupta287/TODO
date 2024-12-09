import { NewTaskDialog } from "./NewTaskDialog";

interface TaskHeaderProps {
  onTaskAdded: () => void;
}

export function TaskHeader({ onTaskAdded }: TaskHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <NewTaskDialog onTaskAdded={onTaskAdded} />
    </div>
  );
}
