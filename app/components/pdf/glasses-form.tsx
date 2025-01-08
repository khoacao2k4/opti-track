"use client";
import { Text, View, Document, Page, Image } from "@react-pdf/renderer";
import styles from "./style";

const phone_number = "0913963003";
const email = "drkhanhtrang.ophth@gmail.com";

export default function GlassesForm({ name, YOB, gender, MT, MP }: { name: string, YOB: string, gender: string, MT: { [key: string]: string }, MP: { [key: string]: string } }) {
  const visionStat = ['UCVA', 'SPH', 'CYL', 'AX', 'BCVA', 'ADD']
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.textBoldItalic}>BS HUỲNH KHÁNH TRANG</Text>
            <Text style={styles.textBoldItalic}>CHUYÊN KHOA CẤP 1 MẮT</Text>
            <Text style={styles.textBoldItalic}>ĐTDĐ: {phone_number}</Text>
            <Text style={styles.textBoldItalic}>EMAIL: {email}</Text>
          </View>
          <View>
            <Text style={styles.textBoldItalic}>ĐỊA CHỈ: 13 Đào Duy Từ P5 Q10</Text>
            <Text style={styles.textBoldItalic}>Giờ khám:</Text>
            <Text style={styles.textBoldItalic}>T2-T7: 17h-19h30</Text>
            <Text style={styles.textBoldItalic}>CN và ngày lễ: Nghỉ</Text>
          </View>
        </View>
        <Text style={styles.title}>ĐƠN KÍNH</Text>
        <View style={{ marginBottom: "20px" }}>
          <View style={styles.section}>
            <Text style={styles.name}>Họ và tên: {name}</Text>
            <Text>Năm sinh: {YOB}</Text>
            <Text>Giới tính: {gender}</Text>
          </View>
          <Text>Địa chỉ: 13 Đào Duy Từ</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text key="emptyHeader" style={styles.tableColHeader}/>
            {visionStat.map((item) => (
              <Text key={"header_"+item} style={styles.tableColHeader}>{item}</Text>
            ))}
          </View>
          <View key={"MP"} style={styles.tableRow}>
            <Text style={styles.tableCol}>MP/OD</Text>
            {visionStat.map((item) => (
              <Text key={"MP_"+item} style={styles.tableCol}>{MP[item]}</Text>
            ))}
          </View>
          <View key={"MT"} style={styles.tableRow}>
            <Text style={styles.tableCol}>MT/OS</Text>
            {visionStat.map((item) => (
              <Text key={"MT_"+item} style={styles.tableCol}>{MT[item]}</Text>
            ))}
          </View>
          {/* {['MP/OD', 'MT/OS'].map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCol}>{row}</Text>
              {[...Array(6)].map((_, j) => (
                <Text key={j} style={styles.tableCol}> </Text>
              ))}
            </View>
          ))} */}
        </View>
        <View>
          <Text>PD:</Text>
          <Text>GLASSES</Text>
          <Text>OD:</Text>
          <Text>OS:</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px'}}>
          <View>
            <Text>Ghi chú:</Text>
            <Text>- Hạn chế sử dụng vi tính, điện thoại</Text>
            <Text>- Tăng cường chơi thể thao ngoài trời</Text>
            <Text>- Đeo kính thường xuyên</Text>
            <Text>- Tái khám sau 10 THÁNG	</Text>
            <Text>- Đem theo toa cũ khi tái khám.</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{textAlign: 'center'}}>Ký tên</Text>
            <Image src={window.location.origin + "/signature.png"} cache={false} style={{width: "100%"}}/>
            <Text style={{textAlign: 'center'}}>BS HUỲNH KHÁNH TRANG</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
