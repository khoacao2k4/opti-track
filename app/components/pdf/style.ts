import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf"
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
      fontWeight: "bold"
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v32/KFOjCnqEu92Fr1Mu51S7ABc9AMX6lJBP.ttf",
      fontWeight: 'bold',
      fontStyle: 'italic',
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    color: "#262626",
    backgroundColor: '#fff',
    fontSize: 11,
    padding: "30px 30px"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "40px"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "30px"
  },
  textBold: {
    fontWeight: "bold",
  },
  textItalic: {
    fontStyle: "italic",
  },
  textBoldItalic: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  section: {
    flexDirection: "row",
    gap: 10,
    marginBottom: "20px"
  },
  name: {
    flexGrow: 0.5
  },
  table: {
    width: '100%',
    marginBottom: "20px",
    borderWidth: 1,
    borderColor: '#000'
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableColHeader: {
    width: '16.66%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    fontWeight: 'bold'
  },
  tableCol: {
    width: '16.66%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4
  },
  signature: {
    marginTop: 40,
    textAlign: 'right',
    fontWeight: 'bold'
  }
});

export default styles