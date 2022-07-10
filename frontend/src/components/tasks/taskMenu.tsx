import { NavLink } from "react-router-dom";

function TaskMenu({ activeTask }: { activeTask: number | undefined }) {

  return (
    <div className="task-menu">
      <NavLink to="/new">
        <i title="New" className="icon fa-solid fa-pen-to-square"></i>
      </NavLink>
    </div>
  );
}

export default TaskMenu;