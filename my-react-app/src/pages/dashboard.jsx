
import Menu from "../components/menu";
import BarChar from "../components/barChart";
import PieChar from "../components/pieChart";
import GoalChar from "../components/goalChart";
import BudgetChar from "../components/bugetChart";
import ShowTable from "../components/showTable";
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
                        <BarChar />
                        <div className="divider-glow"></div>
                        <PieChar />
                        <div className="divider-glow"></div>
                    <GoalChar />
                        <BudgetChar />
                        <div className="divider-glow"></div>
                    <ShowTable />
            </div>
            </div>
            </div>
        </>
    );
}


export default DashBoard;
