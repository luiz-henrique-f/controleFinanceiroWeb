import AddNewValue from "./app/components/add-new-values";
import CardControl from "./app/components/card-control";
import { DataGrid } from "./app/components/data-grid";
import Header from "./app/components/header";

function App() {
  return (
    <div className="">
      <Header />
      <div className="max-w-[1120px] w-[98%] mx-auto flex gap-5 mt-[-50px] justify-around">
        <CardControl title="Entrada" value={0} />
        <CardControl title="Saída" value={0} />
        <CardControl title="Total" value={0} />
      </div>

      <div className="flex p-2 w-[98%] bg-white max-w-[1120px] mx-auto mt-2 rounded-lg">
        <AddNewValue />
      </div>

      <div className="w-[98%] mx-auto max-w-[1120px] p-2 rounded-lg bg-white mt-2">
        <DataGrid />
      </div>
    </div>
  );
}

export default App;
