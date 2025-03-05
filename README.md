# 360° Feedback Vapi Application

A React application for conducting 360° feedback interviews using Vapi voice agents.

## Features

- Collect user information including name and relationship to the subject
- Support for various relationship types (Manager, Direct Report, Peer, etc.)
- Integration with Vapi voice agents for conducting interviews
- Clean, minimalist UI design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Vapi API key (sign up at [vapi.ai](https://www.vapi.ai/))

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```
   cd agents/three-sixty/vapi
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Replace `your_vapi_api_key_here` with your actual Vapi API key

### Environment Variables

This application uses environment variables to store sensitive information like API keys. Create a `.env` file in the root directory with the following variables:

```
REACT_APP_VAPI_API_KEY=your_vapi_api_key_here
```

**Note:** In Create React App, all environment variables must be prefixed with `REACT_APP_` to be accessible in the client-side code.

### Running the Application

Start the development server:

```
npm start
```

or

```
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. Enter your name in the provided field
2. Select your relationship to the subject of the feedback
3. If "Other" is selected, specify the relationship
4. Optionally, add additional context or instructions for the interview
5. Click "Start Feedback Interview" to begin the Vapi call

## Future Enhancements

- Integration with Vapi API for voice calls
- Feedback summary and reporting
- Multi-language support
- Customizable interview questions

## License

This project is proprietary and confidential. 