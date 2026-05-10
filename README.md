# event-timetable-web

A web-based event timetable and role-management dashboard. Built as a single-page HTML app with optional AWS Lambda + DynamoDB backend for shared state.

## Features

- Real-time event schedule with role and duty assignments
- Per-user dashboards showing current and upcoming tasks
- Admin panel for editing schedule, notices, and todos
- Notice broadcasting and todo tracking
- Optional AWS-backed shared state (Lambda + DynamoDB + S3 hosting)
- Local-only mode using `localStorage` if backend is not configured

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Main app (dashboard, schedule, admin panel) |
| `timetable-v2.html` | Alternate timetable view |
| `guide/guide-user.html` | End-user guide |
| `guide/guide-admin.html` | Admin guide (covers AWS architecture) |
| `lambda/index.js` | AWS Lambda backend (Node.js, DynamoDB) |

## Backend setup (optional)

The app works standalone via `localStorage`. To enable shared state across devices:

1. Create a DynamoDB table (partition key: `dataKey` of type String).
2. Deploy `lambda/index.js` as a Lambda function with the DynamoDB SDK.
3. Set the `TABLE` constant (or `AWS_REGION` env var) in `lambda/index.js`.
4. Expose the Lambda via API Gateway (HTTP API) with CORS enabled.
5. In `index.html` and `timetable-v2.html`, replace the placeholder `API_URL` with your API Gateway URL.

## Notes

- Sample schedule data uses anonymized placeholders (`Member01`, `Member02`, ...) and a placeholder phone number (`010-XXXX-XXXX`).
- AWS resource names (table, bucket, API ID) are placeholders — replace with your own.
- Screenshot images referenced in the guide pages are not included in this repo.
- The default admin reset password (`abc123!`) is documented in the admin guide; change it on first deploy.

## License

MIT
