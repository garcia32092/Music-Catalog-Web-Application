const AWS = require('aws-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { sessionId } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const paramsMP3 = {
                Bucket: 'rgarc-first-bucket',
                Key: 'Happy Loop.wav',
                Expires: 60 * 60 * 24 * 14 // URL expiry time in seconds (2 weeks)
            };
            const urlMP3 = s3.getSignedUrl('getObject', paramsMP3);

            return res.status(200).json({ verified: true, urlMP3 });
        } else {
            return res.status(200).json({ verified: false });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
