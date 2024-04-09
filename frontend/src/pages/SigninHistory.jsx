import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./history.css";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
  },
  tableColHeader: {
    width: '33.33%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
  },
});

const HistoryPDF = ({ signinHistories }) => (
  <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text>Username</Text></View>
            <View style={styles.tableColHeader}><Text>Email</Text></View>
            <View style={styles.tableColHeader}><Text>Signin Date</Text></View>
          </View>
          {signinHistories.map((signinHistory, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}><Text>{signinHistory.username}</Text></View>
              <View style={styles.tableCol}><Text>{signinHistory.email}</Text></View>
              <View style={styles.tableCol}><Text>{new Date(signinHistory.signinDate).toLocaleString()}</Text></View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
);

const History = () => {
  const [signinHistories, setSigninHistories] = useState([]);

  useEffect(() => {
    const fetchSigninHistory = async () => {
      try {
        const response = await fetch("api/signinhistory/history");
        if (!response.ok) {
          throw new Error("Failed to fetch signin history");
        }
        const signinHistoriesData = await response.json();
        setSigninHistories(signinHistoriesData);
      } catch (error) {
        console.error("Error fetching signin history:", error);
      }
    };

    fetchSigninHistory();
  }, []);

  return (
    <>
      <Header />
      <div className="card">
        <div className="cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h1 className="h1">
                  <b>User Sign in History</b>
                </h1>
              </div>
            </div>
          </div>
          <table id="history">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Signin Date</th>
              </tr>
            </thead>
            <tbody>
              {signinHistories.map((signinHistory, index) => (
                <tr key={index}>
                  <td>{signinHistory.username}</td>
                  <td>{signinHistory.email}</td>
                  <td>
                    {new Date(signinHistory.signinDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="btn1">
                <PDFDownloadLink
                  document={<HistoryPDF signinHistories={signinHistories} />}
                  fileName="signin_history.pdf"
                >
                  {({ loading }) => (loading ? "Loading document..." : "Download Login history as a PDF")}
                </PDFDownloadLink>
              </div>
        </div>
      </div>
    </>
  );
};

export default History;
