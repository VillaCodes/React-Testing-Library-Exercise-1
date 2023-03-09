import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

//This function extracts the rendering logic
//so we don't repeat this code block in both tests
//beforeEach is discoraged by RTL so we won't use it here
function renderComponent() {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' }
  ];
  render(<UserList users={users} />);

  return {
    users,
  };
}

test('render one row per user', () => {
  //Render the component
  renderComponent();

  //Find all the rows in the table
  //below gives off a linter warning, but we will disable it since this
  //is the best method for what we need
  //eslint-disable-next-line
  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  //Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});