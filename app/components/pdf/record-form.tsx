"use client";
import dynamic from "next/dynamic";
import { Text, View, Document, Page } from "@react-pdf/renderer";
import styles from "./style";

const PDFViewer = dynamic(() => import("./pdfViewer"), {
  ssr: false
});

export default function PagePDF() {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
  return (
    <div className="w-full h-[750px]">
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
