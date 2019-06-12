import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: "AKIAIJS46GKLOB2HLD5Q",
  secretAccessKey: "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"
});

export const s3 = new AWS.S3();