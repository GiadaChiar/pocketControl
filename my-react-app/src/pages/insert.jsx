
import CollapseGoald from "../components/collapseGoal";
import CollapseBudget from "../components/collapseBudget";
import CollapseTransation from "../components/collapseTransation";
import ShowTable from "../components/showTable";
import Menu from "../components/menu";
import "../style/menu.scss";
import "../style/insert.scss";
import "../style/default.scss";

//recipe page 
function Insert() {
    return (
        <>
            <Menu />
            <div className="insert-page">
            <h1>Inserimenti e controlli</h1>
            <div id="collapses">
                <CollapseGoald />
                <CollapseBudget/>
                <CollapseTransation />
                    <div id="filters_table">
                    <h3 className ="titleTable">Cerca ed elimina gli inserimenti</h3>
                    <ShowTable/>
                </div>
                </div>
            </div>
        </>
    );
}

export default Insert;

