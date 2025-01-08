'use client'
import { Box, Button, Fieldset, Grid, Group, NumberInput, Select, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form'
import React, { useState } from 'react';
import GlassesForm from './pdf/glasses-form';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import("./pdf/pdfViewer"), {
  ssr: false
});

const visionStat = ["UCVA", "SPH", "CYL", "AX", "BCVA", "ADD"]

const VisionTable = ({form}: {form: any}) => {
  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          {visionStat.map((item, i) => (
            <Table.Th key={"Header"+i}>{item}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>MP/OD</Table.Td>
          {visionStat.map((item, i) => (
            <Table.Td key={"MP"+i}>
              <TextInput placeholder={item} {...form.getInputProps("MP."+item)}/></Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
          <Table.Td>MT/OS</Table.Td>
          {visionStat.map((item, i) => (
            <Table.Td key={"MT"+i}>
              <TextInput placeholder={item} {...form.getInputProps("MT."+item)}/></Table.Td>
          ))}
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};

const UserForm = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: '', YOB: '', gender: '',
      MT: visionStat.reduce((acc: { [key: string]: string }, item) => {
        acc[item] = '';  // Set default value to empty string or any initial value you need
        return acc;
      }, {}),
      MP: visionStat.reduce((acc: { [key: string]: string }, item) => {
        acc[item] = '';  // Set default value to empty string or any initial value you need
        return acc;
      }, {}),
      // MP_UCVA: '', MP_SPH: '', MP_CYL: '', MP_AX: '', MP_BCVA: '', MP_ADD: '',
      // MT_UCVA: '', MT_SPH: '', MT_CYL: '', MT_AX: '', MT_BCVA: '', MT_ADD: '',
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState({ "name": "", "YOB": "", "gender": "", "MT": {}, "MP": {} });

  const handleSubmit = (values: any) => {
    setIsSubmitted(true);
    setSubmittedValues(values);
    console.log(values);
  };

  return (
    <Grid grow>
      {/* Left Section - Form */}
      <Grid.Col span={6}>
        <Box p="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Fieldset legend="Thông tin bệnh nhân" mb={"md"}>
              <TextInput
                withAsterisk
                label="Họ và tên"
                key={form.key('name')}
                {...form.getInputProps('name')}
                mb={"md"}
              />
              <NumberInput
                withAsterisk
                label="Năm sinh"
                min={1000}
                max={2100}
                allowDecimal={false}
                hideControls={true}
                key={form.key('YOB')}
                {...form.getInputProps('YOB')}
                mb={"md"}
              />
              <Select
                label="Giới tính"
                key={form.key('gender')}
                {...form.getInputProps('gender')}
                placeholder="Chọn giới tính"
                data={['Nam', 'Nữ', 'Khác']}
              />
            </Fieldset>
            <Fieldset legend="Kết quả về mắt" mb={"md"}>
              <VisionTable form={form}/>
            </Fieldset>
            
            <Button type="submit" variant='filled' color='indigo'>
              Submit
            </Button>
          </form>
        </Box>
      </Grid.Col>

      {/* Right Section - PDF Viewer */}
      <Grid.Col span={6}>
        <Box px="md" style={{ borderLeft: '1px solid #ccc' }} hidden={!isSubmitted}>
          <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <GlassesForm {...submittedValues} />
          </PDFViewer>
        </Box>
      </Grid.Col>
    </Grid>
  )
}

export default UserForm;
