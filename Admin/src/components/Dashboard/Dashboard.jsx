import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
//import { useHistory } from "react-router-dom";
import styles from "./Dashboard.module.css";


function Dashboard() {
  const [salesData, setSalesData] = useState({ totalSales: null, totalAmount: null });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/sales/dashboard/admin", {
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
    <div className={styles.dashboard}>
      <h1>Bem-vindo</h1>
      <h3> <br></br>Sistema de Gerenciamento de Usuários e Medicamentos</h3>
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.card_body}>
          <Card.Title className={styles.sub_title}>Valor Total de Vendas</Card.Title>
          <Card.Text className={styles.text}>{`R$ ${salesData.totalSales}`}</Card.Text>
        </Card.Body>
      </Card>

      <Card className={styles.card}>
        <Card.Body className={styles.card_body}>
          <Card.Title className={styles.sub_title}>Quantidade de Podutos Vendido</Card.Title>
          <Card.Text className={styles.text}>{salesData.totalAmount}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default Dashboard;
