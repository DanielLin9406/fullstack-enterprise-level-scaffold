import L from "react-loadable";
import { Loading } from "../../modules/staff/view/dump/Loading";

interface LoadableProps {
  loader: () => Promise<any>;
  modules?: string[];
}

const Loadable = ({ loader, modules }: LoadableProps) => {
  return L({
    loader,
    modules,
    loading: Loading,
    delay: 300,
  });
};
export { Loadable };
