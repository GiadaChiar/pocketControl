
import Menu from "../components/menu";
import BarChar from "../components/barChart";
import PieChar from "../components/pieChart";
import "../style/menu.scss";
import "../style/default.scss";
import "../style/dashboard.scss";


function DashBoard() {
    //function to send clicked to first button send

    return (
        <>
            <div id = "barchar_page">
            <Menu />
            <h1>Il tuo andamento finanziario</h1>
            <div id="graphic_section">
                    <BarChar />
                    <PieChar/>
            </div>
            </div>
        </>
    );
}


export default DashBoard;
