import { useRoutes } from "react-router-dom";
import Routes from "./routes";

export default function Router() {
  const element = useRoutes(Routes);
  return element;
}
