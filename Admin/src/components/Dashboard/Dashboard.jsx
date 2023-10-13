import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
//import { useHistory } from "react-router-dom";
import {} from "react";

function Dashboard() {
  const [salesData, setSalesData] = useState({ totalSales: null, totalAmount: null });
  const [sales, setSales] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/sales/dashboard/admin", {
          headers: {
            Authorization: `${token}`,
          },
        });
        const { totalSales, totalAmount } = response.data.dados; // Certifique-se de usar a estrutur
        setSalesData({ totalSales, totalAmount });
      } catch (error) {
        console.error("Error fetching data:", error);
        setSalesData({ totalSales: 0, totalAmount: 0 });
      }
    };

    fetchData();
  }, [token]); 
  // Se os dados ainda estão sendo carregados, você pode mostrar uma mensagem de carregamento
  if (salesData.totalSales === null || salesData.totalAmount === null) {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >Carregando...</div>;
  }
  return (
    <Container className="mt-2 ">
      <Card>
        <Card.Body>
          <Card.Title>Total de Vendas</Card.Title>
          <Card.Text>{salesData.totalSales}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mt-2">
        <Card.Body>
          <Card.Title>Total de Quantidade Vendida</Card.Title>
          <Card.Text>{salesData.totalAmount}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;
