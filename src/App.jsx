import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Todo from './components/Todo';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <Header />,
      <Home />
      </>
    )
  },
  {
    path: `/todo-list/:id`,
    element: (
      <>
      <Header />,
      <Todo />
      </>
    )
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
