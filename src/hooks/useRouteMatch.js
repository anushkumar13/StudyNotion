// imports

import { useLocation, matchPath } from "react-router-dom";





{/*   React Router ke andar current URL path ko match karna ek specific path ke saath. Iska use tab hota hai jab tumhe dekhna hota hai ki user abhi kis route pe hai, aur kya wo kisi specific route ke saath match karta hai ya nahi.   */}

export default function useRouteMatch(path) {

  const location = useLocation();
  
  return matchPath(location.pathname, { path });
}