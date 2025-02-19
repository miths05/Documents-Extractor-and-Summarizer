import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Input } from 'antd';
import { AlignLeft } from 'lucide-react';

import DataTrackerr from '../../src/Components/AssignmentTracker/DataTrackerr';
import StepsTracker from '../../src/Components/Custom/StepsTracker';

const { TextArea } = Input;

type TrackerItem = {
  key: string;
  doctorName: string;
  reportType: string;
  report: string;
  operation: string;
  driveLink?: string;
  summary?: string;
  [key: string]: any;
};

type CompletionTrackerProps = {
  data: TrackerItem[];
  visibleColumns?: string[];
  primaryColor?: string;
  defaultPdfUrl?: string;
  currentStep?: number;
  onSaveSummary?: (selectedItem: TrackerItem, summary: string) => void;
};

const CompletionTracker: React.FC<CompletionTrackerProps> = ({
  data,
  visibleColumns = ['key', 'doctorName', 'reportType', 'report', 'operation'],
  primaryColor = '#00b96b',
  defaultPdfUrl = '',
  currentStep = 5,
  onSaveSummary,
}) => {
  const [dataSource, setDataSource] = useState<TrackerItem[]>([]);
  const [selectedRow, setSelectedRow] = useState<TrackerItem | null>(null);
  const [text, setText] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>(defaultPdfUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const handleRowSelect = (record: TrackerItem) => {
    setSelectedRow(record);
    setFileUrl(record?.driveLink || defaultPdfUrl);
  };

  const handleGenerateSummary = () => {
    if (selectedRow) {
      setText(selectedRow?.summary || '');
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const applyFormatting = (format: string) => {
    if (format === 'bold') {
      setText(`**${text}**`);
    } else if (format === 'italic') {
      setText(`*${text}*`);
    } else if (format === 'uppercase') {
      setText(text.toUpperCase());
    } else if (format === 'lowercase') {
      setText(text.toLowerCase());
    }
  };

  const saveText = () => {
    if (selectedRow && onSaveSummary) {
      onSaveSummary(selectedRow, text);
    }
  };

  const showModal = () => {
    setModalText(text);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setText(modalText);
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModalText(e.target.value);
  };

  return (
    <div style={contentStyle}>
      <Row gutter={[16, 16]} style={{ height: 'calc(100vh - 64px)' }}>
        <Col xs={24} sm={24} md={10} lg={9} style={{ height: '100%' }}>
          <div style={{ ...sectionStyle, height: '100%', borderRight: '2px solid #f0f0f0' }}>
            <h2 style={sectionHeaderStyle}>Completion Tracker</h2>
            <div style={{ width: '100%', flexGrow: 1, overflowY: 'auto', overflowX: 'auto' }}>
              <DataTrackerr
                dataSource={dataSource}
                visibleColumns={visibleColumns}
                selectable={true}
                onRowSelect={handleRowSelect}
                step={currentStep}
              />
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={8} lg={9} style={{ height: '100%' }}>
          <div style={{ ...sectionStyle, height: '100%', borderRight: '2px solid #f0f0f0' }}>
            <h2 style={sectionHeaderStyle}>Input File Viewer</h2>
            {fileUrl && (
              <iframe
                src={fileUrl}
                style={{ width: '100%', flexGrow: 1, border: 'none' }}
                title="PDF Viewer"
                allow="autoplay"
              />
            )}
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6} style={{ height: '100%' }}>
          <div style={{ ...sectionStyle, height: '100%', position: 'relative' }}>
            <button 
              onClick={showModal} 
              style={modalButtonStyle}
            >
              Medical Summary
            </button>
            
            <h2 style={sectionHeaderStyle}>Generated Summary</h2>
            
            <div style={generateButtonContainerStyle}>
              <button onClick={handleGenerateSummary} style={primaryButtonStyle}>
                Generate Summary
              </button>
            </div>
            
            <div style={toolbarStyle}>
              {onSaveSummary && (
                <button onClick={saveText} style={{...buttonStyle, marginLeft: 'auto'}}>Save</button>
              )}
            </div>
            
            <div style={textAreaWrapperStyle}>
              <AlignLeft 
                size={20}
                style={textAreaIconStyle}
              />
              <textarea
                value={text}
                onChange={handleTextChange}
                style={enhancedTextAreaStyle}
                placeholder="Edit the summary here..."
                onFocus={(e) => {
                  e.target.style.borderColor = '#4a90e2';
                  e.target.style.boxShadow = '0 0 0 2px rgba(74, 144, 226, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgb(78, 66, 96)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <StepsTracker step={3} />

      <Modal 
        title="Edit Summary" 
        open={isModalOpen} 
        onOk={handleModalOk} 
        onCancel={handleModalCancel}
        width={600}
        style={{top: 20}}
      >
        <TextArea
          rows={6}
          value={modalText}
          onChange={handleModalTextChange}
          style={{
            minHeight: "300px",
            width: "100%",
            padding: "8px",
            fontSize: "14px",
          }}
          placeholder="Edit the summary here..."
        />
      </Modal>
    </div>
  );
};

// Styles remain the same...
const contentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: 'rgb(199, 222, 255)',
  padding: '12px',
  height: '100vh',
};

const sectionStyle: React.CSSProperties = {
  background: '#ffffff',
  padding: '12px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const sectionHeaderStyle: React.CSSProperties = {
  color: '#333',
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '12px',
  width: '100%',
  textAlign: 'center',
};

const textAreaWrapperStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  flexGrow: 1,
};

const enhancedTextAreaStyle: React.CSSProperties = {
  width: '100%',
  flexGrow: 1,
  padding: '12px 12px 12px 36px',
  borderRadius: '6px',
  border: '1px solid rgb(78, 66, 96)',
  fontSize: '14px',
  resize: 'none',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  outline: 'none',
  transition: 'all 0.2s ease-in-out',
  minHeight: '400px',
  fontFamily: 'Inter, system-ui, sans-serif',
  lineHeight: '1.5',
};

const textAreaIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '12px',
  top: '12px',
  color: 'rgb(78, 66, 96)',
  opacity: 0.7,
};

const toolbarStyle: React.CSSProperties = {
  marginBottom: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  width: '100%',
  justifyContent: 'flex-start',
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 8px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#3a83ea',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '12px',
  transition: 'transform 0.2s ease-in-out',
  flexGrow: 1,
  maxWidth: 'calc(25% - 5px)',
};

const generateButtonContainerStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '12px',
};

const primaryButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#3a83ea',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
  width: '80%',
};

const modalButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'rgb(24, 144, 255)',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '600',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.2s ease-in-out',
  zIndex: 1,
};

export default CompletionTracker;