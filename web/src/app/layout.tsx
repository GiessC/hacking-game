import { Outlet } from 'react-router';

export function Layout() {
  return (
    <div>
      <h3>Ctrl+Alt+Drink</h3>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
