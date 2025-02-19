import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Typography, Modal, Input } from 'antd';
import { CSSProperties } from 'react';
import DataTrackerr from '../Components/AssignmentTracker/DataTrackerr';
import StepsTracker from '../Components/Custom/StepsTracker';
import { useDataSourceState } from '../context/DataSourceContext';
const { Title, Text } = Typography;

type Props = {
  primaryColor?: string;
};

const FileTrackerPage: React.FC<Props> = () => {
  const dataSourceState = useDataSourceState();
  const [pages] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<string[] | unknown[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>("");

  const visibleColumns = [
    'key',
    'doctorName',
    'report',
    'reportType',
    'startPage',
    'endPage',
    'operation',
  ];

  useEffect(() => {
    setDataSource(dataSourceState?.data || []);
  }, [dataSourceState]);

  const handleDelete = () => {
    if (dataSource.length > 0) {
      setDataSource(dataSource.slice(0, -1));
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Textarea value:", textValue);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={contentStyle}>
      <Row gutter={[8, 8]} style={{ height: 'calc(100vh - 100px)' }}>
        <Col xs={24} md={12} style={{ height: '100%' }}>
          <Card
            hoverable
            style={{ ...cardStyle, height: '100%', display: 'flex', flexDirection: 'column' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 4px 10px rgba(0, 0, 0, 0.15)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 2px 8px rgba(0, 0, 0, 0.1)')
            }
            title={
              <div style={cardHeaderStyle}>
                <Title level={5} style={titleStyle}>
                  Input File Viewer
                </Title>
                <Text type="secondary" style={subtitleStyle}>
                  File Size: 169 MB | Pages: {pages}
                </Text>
              </div>
            }
            bodyStyle={{ flex: 1, padding: '8px', overflow: 'hidden' }}
          >
            <iframe
              src="https://s3ktechai-my.sharepoint.com/personal/hrishikesh_s3ktech_ai/_layouts/15/embed.aspx?UniqueId=1955394c-b0e0-451e-8817-4dfde2fafc64"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="PDF Viewer"
            />
          </Card>
        </Col>

        <Col xs={24} md={12} style={{ height: '100%' }}>
          <Card
            hoverable
            style={{ ...cardStyle, height: '100%', display: 'flex', flexDirection: 'column' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 4px 10px rgba(0, 0, 0, 0.15)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 2px 8px rgba(0, 0, 0, 0.1)')
            }
            title={
              <div style={cardHeaderStyle}>
                <Title level={5} style={titleStyle}>
                  Input File Slicing & Sequencing
                </Title>
                <div style={buttonGroupStyle}>
                  <Button
                    onClick={() => setOpen(true)}
                    type="primary"
                    size="small"
                    style={buttonStyle}
                    onMouseEnter={(e) => hoverEffect(e, true)}
                    onMouseLeave={(e) => hoverEffect(e, false)}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={handleDelete}
                    type="primary"
                    size="small"
                    style={deleteButtonStyle}
                    onMouseEnter={(e) => hoverEffect(e, true)}
                    onMouseLeave={(e) => hoverEffect(e, false)}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={showModal}
                    type="primary"
                    size="small"
                    style={summaryButtonStyle}
                    onMouseEnter={(e) => hoverEffect(e, true)}
                    onMouseLeave={(e) => hoverEffect(e, false)}
                  >
                    Summary
                  </Button>
                </div>
              </div>
            }
            bodyStyle={{ flex: 1, padding: '8px', overflow: 'auto' }}
          >
            <DataTrackerr
              dataSource={dataSource}
              visibleColumns={visibleColumns}
              selectable={false}
              editable={true}
              modalVisible={open}
              setOpen={setOpen}
            />
          </Card>
        </Col>
      </Row>

      <div style={stepsTrackerContainer}>
        <StepsTracker step={2} />
      </div>

      <Modal 
        title="Enter Medical Summary" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        width={600}
        style={{top: 20}}
      >
        <Input.TextArea
          rows={6}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          style={textAreaStyle}
          placeholder="Enter medical summary details here..."
        />
      </Modal>
    </div>
  );
};
const contentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  background: 'rgb(199, 222, 255)',
  padding: '10px',
  minHeight: '90vh',
};

const cardStyle: CSSProperties = {
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease-in-out',
  padding: '10px',
  backgroundColor: '#ffffff',
};

const cardHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #e0e0e0',
  paddingBottom: '6px',
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontWeight: 600,
  fontSize: '16px',
  color: '#333',
};

const subtitleStyle: CSSProperties = {
  fontSize: '10px',
  color: '#666',
};

const buttonGroupStyle: CSSProperties = {
  display: 'flex',
  gap: '8px',
};

const buttonStyle: CSSProperties = {
  backgroundColor: '#00b96b',
  borderColor: '#00b96b',
  borderRadius: '4px',
  color: '#ffffff',
  fontWeight: 500,
  padding: '4px 12px',
  height: 'auto',
  fontSize: '12px',
  transition: 'all 0.2s ease-in-out',
};

const deleteButtonStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#ff4d4f',
  borderColor: '#ff4d4f',
};

const summaryButtonStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#1890ff',
  borderColor: '#1890ff',
};

const stepsTrackerContainer: CSSProperties = {
  marginTop: '12px',
  padding: '12px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const textAreaStyle: CSSProperties = {
  minHeight: "300px",
  width: "100%",
  padding: "8px",
  fontSize: "14px",
};

const hoverEffect = (e: React.MouseEvent<HTMLElement>, hover: boolean) => {
  const button = e.currentTarget as HTMLButtonElement;
  if (hover) {
    button.style.transform = 'scale(1.02)';
    button.style.filter = 'brightness(0.95)';
  } else {
    button.style.transform = 'none';
    button.style.filter = 'none';
  }
};

export default FileTrackerPage;