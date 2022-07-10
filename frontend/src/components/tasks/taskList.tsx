import { NavLink } from "react-router-dom";
import { Task } from "../../redux/models";

const activeStyle = {
  backgroundColor: "rgb(71, 85, 105)",
  color: "rgb(137, 207, 203)"
}

function TaskList({ tasks }: { tasks: Task[] }) {

  const sortAndFilter = () => {
    const filtered = tasks.filter(task => task.completed === false);
    return filtered.sort((a, b) => new Date(b.CreatedAt).valueOf() - new Date(a.CreatedAt).valueOf());
  }
  return (
    <div className="task-list">
      {sortAndFilter().map((task) => (
        <NavLink
          to={`/${task.ID}`}
          state={{ task }}
          style={({ isActive }) => 
            isActive ? activeStyle : {}
          }
          className="menu-item"
          key={task.ID}
        >
          {task.title}
        </NavLink>
      ))}
    </div>
  )
}

export default TaskList;