import React, { useState } from 'react';
import DateSelector from '../components/DateSelector';
import TimeSelector from '../components/TimeSelector';
import AppointmentDetailsForm from '../components/AppointmentDetailsForm';
import ConfirmationSummary from '../components/ConfirmationSummary';

// Mock user data
const mockUser = {
  name: 'John Doe',
  school: 'Sunrise High School',
  email: 'johndoe@example.com',
};

const Appointment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    groupSize: 0,
    visitType: '',
    specialRequests: '',
  });

  const updateData = (field: string, value: string | number) => {
    setAppointmentData({ ...appointmentData, [field]: value });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Book a Campus Tour</h1>
        <p className="text-center text-gray-600 mb-8">
          Plan your group visit to experience Bilkent!
        </p>
        {step === 1 && (
          <DateSelector
            onSelectDate={(date) => {
              updateData('date', date);
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <TimeSelector
            date={appointmentData.date}
            onSelectTime={(time) => {
              updateData('time', time);
              setStep(3);
            }}
          />
        )}
        {step === 3 && (
          <AppointmentDetailsForm
            user={mockUser}
            data={appointmentData}
            onUpdateData={updateData}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <ConfirmationSummary
            user={mockUser}
            data={appointmentData}
            onEdit={() => setStep(1)}
          />
        )}
      </div>
    </>
  );
};

export default Appointment;
