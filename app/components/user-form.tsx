'use client'
import { Box, Button, Fieldset, Grid, Group, NumberInput, Select, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form'
import React, { useState } from 'react';
import GlassesForm from './pdf/glasses-form';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import("./pdf/pdfViewer"), {
  ssr: false
});

/* eslint-disable @typescript-eslint/no-explicit-any */
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
      name: '', YOB: '', gender: '', address: '',
      MT: visionStat.reduce((acc: { [key: string]: string }, item) => {
        acc[item] = '';  // Set default value to empty string or any initial value you need
        return acc;
      }, {}),
      MP: visionStat.reduce((acc: { [key: string]: string }, item) => {
        acc[item] = '';  // Set default value to empty string or any initial value you need
        return acc;
      }, {}),
      current_glasses: '',
      right_eye: '',
      left_eye: '',
      reassessmentTime: '',
      // MP_UCVA: '', MP_SPH: '', MP_CYL: '', MP_AX: '', MP_BCVA: '', MP_ADD: '',
      // MT_UCVA: '', MT_SPH: '', MT_CYL: '', MT_AX: '', MT_BCVA: '', MT_ADD: '',
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState({ 
    "name": "", "YOB": "", "gender": "", "address": "", "MT": {}, "MP": {}, "current_glasses": "", "right_eye": "", "left_eye": "",
    "reassessmentTime": ""
  });

  const handleSubmit = (values: any) => {
    setIsSubmitted(true);
    setSubmittedValues(values);
    console.log(values);
  };

  return (
    <Grid grow>
      {/* Left Section - Header + Form */}
      <Grid.Col span={6}>
        <Box style={{
          textAlign: 'center',
          padding: '20px 0',
          backgroundColor: '#1A73E8', // Custom color for header
          borderRadius: '8px'
        }}>
          <Title order={1} style={{
            fontSize: '42px',
            fontWeight: 800,
            color: '#fff', 
            fontFamily: 'Poppins, sans-serif'
          }}>
            VisionPDF
          </Title>
        </Box>
        <Box px="md" pt={"md"}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Fieldset legend="Thông tin bệnh nhân" mb={"md"}>
              <Group grow>
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
              </Group>
              <Grid>
                <Grid.Col span={3}>
                  <Select
                    label="Giới tính"
                    key={form.key('gender')}
                    {...form.getInputProps('gender')}
                    placeholder="Chọn giới tính"
                    data={['Nam', 'Nữ', 'Khác']}
                  />
                </Grid.Col>
                <Grid.Col span={9}>
                  <TextInput
                    withAsterisk
                    label="Địa chỉ"
                    key={form.key('address')}
                    {...form.getInputProps('address')}
                  />
                </Grid.Col>
              </Grid>
            </Fieldset>
            <Fieldset legend="Kết quả về mắt" mb={"md"}>
              <VisionTable form={form}/>
            </Fieldset>
            <Fieldset legend="Chuẩn đoán" mb={"md"}>
              <TextInput
                label="Kính hiện tại"
                key={form.key('current_glasses')}
                {...form.getInputProps('current_glasses')}
                mb={"sm"}
              />
              <TextInput
                label="Mắt phải"
                key={form.key('right_eye')}
                {...form.getInputProps('right_eye')}
                mb={"sm"}
              />
              <TextInput
                label="Mắt trái"
                key={form.key('left_eye')}
                {...form.getInputProps('left_eye')}
                mb={"sm"}
              />
              <NumberInput
                withAsterisk
                label="Tái khám sau mấy tháng?"
                min={0}
                allowDecimal={false}
                hideControls={true}
                key={form.key('reassessmentTime')}
                {...form.getInputProps('reassessmentTime')}
                mb={"sm"}
              />
            </Fieldset>
            <Group justify="center" mt="md">
              <Button type="submit" size='md'>Submit</Button>
            </Group>
          </form>
        </Box>
      </Grid.Col>

      {/* Right Section - PDF Viewer */}
      <Grid.Col span={6}>
        <Box p="md" style={{ borderLeft: '1px solid #ccc', height: '100%' }} hidden={!isSubmitted}>
          <PDFViewer style={{ width: "100%", height: "100%"}}>
            <GlassesForm {...submittedValues} />
          </PDFViewer>
        </Box>
      </Grid.Col>
    </Grid>
  )
}

export default UserForm;
