import TableVessels from "./TableVessels";
import DataGridVessels from "./DataGridVessels";
import DuvView from './DuvView'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default function (){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableVessels />} />
        <Route path="horarios">
          <Route path=":duv" element={<DuvView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}