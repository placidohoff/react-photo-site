import { useState } from "react"

const styles = {
    session: {
        border: '1px solid black',
        borderRadius: '5px',
        marginTop: '200px',
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    formRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    input: {
        width: '75%'
    }
}

export default function Session() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [locationAddress, setLocationAddress] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [sessionDate, setSessionDate] = useState(null)
    const [sessionTime, setSessionTime] = useState(null)
    const [sessionType, setSessionType] = useState('')
    const [additionalNotes, setAdditionalNotes] = useState('')

    return (
        <div style={styles.session}>
            <h1>Book Your Session</h1>
            <form>
                <label style={styles.formRow}>
                    Contact Name:
                    <input type="text" className="m-2" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="text" className="m-2" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </label>
                <label style={styles.formRow}>
                    Email:
                    <input type="email" className="m-2" style={styles.input} placeholder="Email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required />
                </label>
                <label style={styles.formRow}>
                    Phone Number:
                    <input type="number" className="m-2" style={styles.input} placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </label>

                <label style={styles.formRow}>
                    Address:
                    <input type="text" className="m-2" style={styles.input} placeholder="Street Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />

                </label>
                <div style={{ display: 'flex', width: '62%', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'flex-end' }}>
                    <input type="text" className="m-2" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    <input type="text" className="m-2" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required
                        style={{
                            width:'10%'
                        }}
                    />
                    <input type="text" className="m-2" placeholder="zip" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required
                        style={{
                            width:'10%'
                        }}
                    />

                </div>
                <label style={styles.formRow}>
                <select value={sessionType}
                        onChange={e => setSessionType(e.target.value)}
                        // className='select input-text'
                        required
                    >
                        <option value={'wedding'}></option>
                        {/* <option value={'small'}>Small</option>
                        <option value={'normal'}>Normal</option>
                        <option value={'larger'}>Larger</option> */}
                    </select>
                </label>

            </form>
        </div>
    )
}