import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-700 text-white text-center py-2">
            <h1 className="text-xl font-semibold">Personal Profile</h1>
          </div>

          {/* Allotment Details */}
          <div className="bg-gray-700 text-white text-center py-2 mt-2">
            <h2 className="text-lg">Allotment Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gr Number</label>
              <input
                type="text"
                defaultValue="N04112100015"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CAP Round</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2">
                <option>I</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Admission Type</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2">
                <option>MS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Application ID</label>
              <input
                type="text"
                defaultValue="EN21237293"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State Merit No</label>
              <input
                type="text"
                defaultValue="36312"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">General Merit No</label>
              <input
                type="text"
                defaultValue="68693"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-gray-700 text-white text-center py-2">
            <h2 className="text-lg">Personal Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                defaultValue="Dinesh"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                type="text"
                defaultValue="Chandrakant"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                defaultValue="Sonawane"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2">
                <option>Male</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Father's Full Name</label>
              <input
                type="text"
                defaultValue="Sonawane Chandrakant Kedu"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
              <input
                type="text"
                defaultValue="Chhaya"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="text"
                defaultValue="23-10-2003"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Place</label>
              <input
                type="text"
                defaultValue="Mumbai"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2">
                <option>B+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Father Occupation</label>
              <input
                type="text"
                defaultValue="Service"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Child No</label>
              <input
                type="text"
                defaultValue="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Income</label>
              <input
                type="text"
                defaultValue="300000"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mother Tongue</label>
              <input
                type="text"
                defaultValue="Marathi"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Religion</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2">
                <option>Hindu</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2">
                <option>SC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Caste</label>
              <input
                type="text"
                defaultValue="Chambhar"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nationality</label>
              <input
                type="text"
                defaultValue="Indian"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Domicile of</label>
              <input
                type="text"
                defaultValue="Maharashtra"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle No</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License No</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
          </div>

          {/* Address Details */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Local Address</label>
                <textarea
                  defaultValue="Plot No. 17,Sudarshan Colony,Dattanagar,Peth Road,Panchwati Nashik."
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
                <textarea
                  defaultValue="Plot No. 17,Sudarshan Colony,Dattanagar,Peth Road,Panchwati Nashik."
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">District</label>
                <input
                  type="text"
                  defaultValue="Nashik"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pin</label>
                <input
                  type="text"
                  defaultValue="422003"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2">
                  <option>Maharashtra</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Student Contact</label>
                <input
                  type="text"
                  defaultValue="9156537875"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Student Email</label>
                <input
                  type="email"
                  defaultValue="sonawanedinesh2310@gmail.com"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Contact</label>
                <input
                  type="text"
                  defaultValue="9960520775"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Email</label>
                <input
                  type="email"
                  defaultValue="sonawanedinesh2310@gmail.com"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Entrance Details */}
          <div className="bg-gray-700 text-white text-center py-2 mt-4">
            <h2 className="text-lg">Entrance Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CET</label>
              <input
                type="text"
                defaultValue="75.00"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">AIEEE</label>
              <input
                type="text"
                defaultValue="0.00"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Other</label>
              <input
                type="text"
                defaultValue="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
          </div>

          {/* HSC Details */}
          <div className="bg-gray-700 text-white text-center py-2 mt-4">
            <h2 className="text-lg">HSC Details</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phy</label>
                <input
                  type="text"
                  defaultValue="85"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Chem</label>
                <input
                  type="text"
                  defaultValue="87"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Math</label>
                <input
                  type="text"
                  defaultValue="94"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <input
                  type="text"
                  defaultValue="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">VOC</label>
                <input
                  type="text"
                  defaultValue="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">PCM</label>
                <input
                  type="text"
                  defaultValue="266"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">PCB</label>
                <input
                  type="text"
                  defaultValue="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">English</label>
                <input
                  type="text"
                  defaultValue="88"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Current Affiliation Details */}
          <div className="bg-gray-700 text-white text-center py-2 mt-4">
            <h2 className="text-lg">Current Affiliation Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">PRN / Enrollment No</label>
              <input
                type="text"
                defaultValue="2152441257007"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Eligibility No</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
          </div>

          {/* Educational Details */}
          <div className="bg-gray-700 text-white text-center py-2 mt-4">
            <h2 className="text-lg">Educational Details</h2>
          </div>
          <div className="p-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-500">No Details Available</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add New
              </button>
            </div>
          </div>

          {/* Project / Seminar Details */}
          <div className="bg-gray-700 text-white text-center py-2 mt-4">
            <h2 className="text-lg">Project / Seminar Details</h2>
          </div>
          <div className="p-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-500">No Details Available</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add New
              </button>
            </div>
          </div>

          {/* Declaration */}
          <div className="bg-gray-700 text-white text-center py-2 mt-4">
            <h2 className="text-lg">Declaration</h2>
          </div>
          <div className="p-4">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                className="mt-1"
              />
              <label className="text-sm text-gray-700">
                I know that I am abide for regular updation of personal information in the system. Any communication gap due to improper personal information will be the responsibility of students. I agree that All addresses/phone numbers filled are correct and working.
              </label>
            </div>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;