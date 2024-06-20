import React from 'react'

// Display instruction when user toggle 'More info'
function Help({handleHelpShow, showHelp }) {

    return (
        <div className='help-container'>
            {/* The content of the instruction */}
            <div className="show-instruction-popup" style={showHelp ? {display:'inline'} : {}}>
                <div className='show-instruction-popup-header'>
                    <div className='show-instruction-title'>Instruction</div>
                    <button className='closeInstructionsBtn' onClick={handleHelpShow}>&times;</button>
                </div>
                <div className='instruction-body'>
                    <p>  
                    Personal trainer Application is designed for professional Personal trainers and clients.
                    A personal trainer will be able to add and assign workout to their user. 
                    Clients will be able to only access the workout plan addressed to them.
                    </p>
               
                </div>
            </div>
        </div>
    );
  }

// Sent to the app file.
export default Help;