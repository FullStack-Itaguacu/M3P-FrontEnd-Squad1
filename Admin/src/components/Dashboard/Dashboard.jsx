import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

function Dashboard() {
  const [salesData, setSalesData] = useState({ totalSales: 0, totalAmount: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/sales/dashboard/admin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { totalSales, totalAmount } = response.data;
        setSalesData({ totalSales, totalAmount });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once after the initial render

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
