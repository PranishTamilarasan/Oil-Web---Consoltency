require('dotenv').config();

console.log('=== API Key Debug ===');
console.log('OPENROUTER_API_KEY exists:', !!process.env.OPENROUTER_API_KEY);
console.log('OPENROUTER_API_KEY length:', process.env.OPENROUTER_API_KEY?.length || 0);
console.log('OPENROUTER_API_KEY starts with:', process.env.OPENROUTER_API_KEY?.substring(0, 10) + '...' || 'undefined');

// Test OpenRouter initialization
try {
    const { OpenRouter } = require('@openrouter/sdk');
    console.log('\n✅ OpenRouter SDK loaded');
    
    if (process.env.OPENROUTER_API_KEY) {
        const openrouter = new OpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY
        });
        console.log('✅ OpenRouter initialized with API key');
        
        // Test a simple API call
        openrouter.chat.send({
            chatGenerationParams: {
                model: "stepfun/step-3.5-flash:free",
                messages: [{ role: "user", content: "Say 'API test successful'" }],
                temperature: 0.7,
                max_tokens: 50
            }
        }).then(response => {
            console.log('✅ API call successful:', response.choices[0].message.content);
            process.exit(0);
        }).catch(error => {
            console.error('❌ API call failed:', error.message);
            process.exit(1);
        });
    } else {
        console.log('❌ No API key found');
        process.exit(1);
    }
} catch (error) {
    console.error('❌ SDK error:', error.message);
    process.exit(1);
}
