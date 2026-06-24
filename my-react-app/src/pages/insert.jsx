
import CollapseGoald from "../components/collapseGoal";
import CollapseBudget from "../components/collapseBudget";
import CollapseTransation from "../components/collapseTransation";
import ShowTable from "../components/showTable";
import Menu from "../components/menu";
import "../style/menu.scss";
//recipe page 
function Insert() {
    return (
        <>
            <Menu />
            <h1>Inserimenti e controlli</h1>
            <div id="collapses">
                <CollapseGoald />
                <CollapseBudget/>
                <CollapseTransation />
                <div id="filters_table">
                    <ShowTable/>
                </div>
            </div>
        </>
    );
}

export default Insert;

