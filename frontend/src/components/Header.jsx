import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Blog</NavLink>
        <NavLink to="/resume">Lebenslauf</NavLink>
        <NavLink to="/projects">Projecte</NavLink>
      </nav>
    </header>
  );
}