import { useAppSelector } from "../../redux/hooks";
import { User } from "../../redux/models";

function Profile({ user }: { user: User | undefined }) {

  const tasks = useAppSelector(state => state.tasks.tasks);

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <div className="task">
      <div className="login-form">
        <h1 style={{ fontSize: '2rem' }}>Hi, {user?.username}</h1>
        <p className="form-label">Email: {user?.email}</p>
        <p className="form-label">
          Completed Tasks: {completedTasks.length}
        </p>
        <p className="form-label">
          Incomplete Tasks: {incompleteTasks.length}
        </p>
      </div>
    </div>
  )
}

export default Profile;