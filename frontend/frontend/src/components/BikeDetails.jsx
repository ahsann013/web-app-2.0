import React from 'react';

const BikeDetails = ({ selectedBike }) => {
  if (!selectedBike) {
    return <div>No bike selected</div>;
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Bike Details</h2>
      <table className="table-auto">
        <tbody>
          <tr>
            <td className="font-semibold">Bike ID:</td>
            <td>{selectedBike.BikeId}</td>
          </tr>
          <tr>
            <td className="font-semibold">Time Recorded:</td>
            <td>{selectedBike.TimeRecorded}</td>
          </tr>
          <tr>
            <td className="font-semibold">Longitude:</td>
            <td>{selectedBike.Longitude}</td>
          </tr>
          <tr>
            <td className="font-semibold">Latitude:</td>
            <td>{selectedBike.Latitude}</td>
          </tr>
          <tr>
            <td className="font-semibold">Actual Battery Capacity:</td>
            <td>{selectedBike.ActualBatteryCapacity}</td>
          </tr>
          <tr>
            <td className="font-semibold">Battery Box Temperature:</td>
            <td>{selectedBike.BatteryBoxTemperature}</td>
          </tr>
          <tr>
            <td className="font-semibold">Battery Cycle Capacity:</td>
            <td>{selectedBike.BatteryCycleCapacity}</td>
          </tr>
          <tr>
            <td className="font-semibold">Battery Temperature:</td>
            <td>{selectedBike.BatteryTemperature}</td>
          </tr>
          <tr>
            <td className="font-semibold">Battery Warning:</td>
            <td>{selectedBike.BatteryWarning ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td className="font-semibold">Current:</td>
            <td>{selectedBike.Current}</td>
          </tr>
          <tr>
            <td className="font-semibold">Voltage:</td>
            <td>{selectedBike.Voltage}</td>
          </tr>
          <tr>
            <td className="font-semibold">State of Charge (SOC):</td>
            <td>{selectedBike.SOC}</td>
          </tr>
          <tr>
            <td className="font-semibold">Number of Battery Cycles:</td>
            <td>{selectedBike.NumOfBatteryCycles}</td>
          </tr>
          <tr>
            <td className="font-semibold">Mosfet Temperature:</td>
            <td>{selectedBike.MosfetTemperature}</td>
          </tr>
          <tr>
            <td className="font-semibold">Crash State:</td>
            <td>{selectedBike.CrashState ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td className="font-semibold">Speed:</td>
            <td>{selectedBike.Speed}</td>
          </tr>
          <tr>
            <td className="font-semibold">RPM:</td>
            <td>{selectedBike.RPM}</td>
          </tr>
          <tr>
            <td className="font-semibold">Controller Temperature:</td>
            <td>{selectedBike.Controller_Temp}</td>
          </tr>
          <tr>
            <td className="font-semibold">External Temperature:</td>
            <td>{selectedBike.External_Temp}</td>
          </tr>
          <tr>
            <td className="font-semibold">Controller Fault 1:</td>
            <td>{selectedBike.ControllerFault1}</td>
          </tr>
          <tr>
            <td className="font-semibold">Controller Fault 2:</td>
            <td>{selectedBike.ControllerFault2}</td>
          </tr>
          <tr>
            <td className="font-semibold">Controller Fault 3:</td>
            <td>{selectedBike.ControllerFault3}</td>
          </tr>
          <tr>
            <td className="font-semibold">Controller Fault 4:</td>
            <td>{selectedBike.ControllerFault4}</td>
          </tr>
          <tr>
            <td className="font-semibold">Unlock Code:</td>
            <td>{selectedBike.UnlockCode}</td>
          </tr>
          <tr>
            <td className="font-semibold">Occupied:</td>
            <td>{selectedBike.Occupied ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BikeDetails;
