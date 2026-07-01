
import Menu from "../components/menu";
import BarChar from "../components/barChart";
import PieChar from "../components/pieChart";
import GoalChar from "../components/goalChart";
import BudgetChar from "../components/bugetChart";
import ShowTable from "../components/showTable";
import TotalChar from "../components/totalChart";
import "../style/menu.scss";
import "../style/default.scss";
import "../style/dashboard.scss";


function DashBoard() {
    //function to send clicked to first button send

    return (
        <>
            <div id = "barchar_page">
                <Menu />
                <div className="dashboard-bg">
            <h1>Il tuo andamento finanziario</h1>
                    <div id="graphic_section">
                        <TotalChar/>
                        <BarChar />
                        <div className="divider-glow"></div>
                        <PieChar />
                        <div className="divider-glow"></div>
                        <GoalChar />
                        <div className="divider-glow"></div>
                        <BudgetChar />
                        <div className="divider-glow"></div>
                        <div id ="charTable">
                        <h3 id="titleTableDash" className="ChartH3">Cerca gli inserimenti</h3>
                        <ShowTable />
                        </div>
            </div>
            </div>
            </div>
        </>
    );
}


export default DashBoard;
