import { useEffect, useState } from "react";
import axios from "axios";
import {  Card, Stack, Col } from "react-bootstrap";
//import { useHistory } from "react-router-dom";
import styles from "./Dashboard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import {useContexto} from "../../context/useContexto";

function Dashboard() {
  const [salesData, setSalesData] = useState({ totalSales: null, totalAmount: null });

  const token = localStorage.getItem("token");
  const {BASEURL, ENDPOINTDASHBOARD} = useContexto();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASEURL}${ENDPOINTDASHBOARD}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const { totalSales, totalAmount } = response.data.dados; 
        setSalesData({ totalSales, totalAmount });
      } catch (error) {
        console.error("Error fetching data:", error);
        setSalesData({ totalSales: 0, totalAmount: 0 });
      }
    };

    fetchData();
  }, [token]); 
  
  return (    
    <div className={`pb-5 ${styles.dashboardStyle}`}>
      <h1 className="text-center text-black pt-4">Bem-vindo ao Sistema Express Pharmacy</h1>
      <h4 className="text-center text-black pt-2 pb-3">Administrador, aqui você tem acesso ao Gerenciamento de Usuários e Medicamentos.</h4>
      <p className="text-center text-black">Abaixo você pode acompanhar um resumo dos seus resultados até agora:</p>
      <Stack direction="horizontal" gap={3} className="d-flex justify-content-center">
        <Col md={4}>      
          <Card className={`p-4 ${styles.cardStyle}`}>
            <Card.Body>
              <i className="bi bi-cash-stack text-black d-flex justify-content-center p-3"></i>
              <Card.Title className="text-center text-black">Valor Total de Vendas</Card.Title>
              <Card.Text className="text-center text-black">{`R$ ${salesData.totalSales}`}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
        <Card className={`p-4 ${styles.cardStyle}`}>
          <Card.Body>
            <i className="bi bi-box-seam text-black d-flex justify-content-center p-3"></i>
            <Card.Title className="text-center text-black">Qtd Produtos Vendidos</Card.Title>
            <Card.Text className="text-center text-black">{salesData.totalAmount}</Card.Text>
          </Card.Body>
        </Card>
        </Col>
      </Stack>
    </div>    
  );
}

export default Dashboard;
