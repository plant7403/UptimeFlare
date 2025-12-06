import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "Pak Unity Status",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/', label: 'GitHub' },
    { link: 'https://blog.pak.academy/', label: 'Blog' },
    { link: 'mailto:contact@pak.academy', label: 'Email Me', highlight: true },
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    '🌐 Websites': ['pak.academy', 'expat.food'],
    '🔐 Private': ['test_tcp_monitor'],
  },
  // [OPTIONAL] Set the path to your favicon, default to '/favicon.png' if not specified
  // favicon: 'https://example.com/favicon.ico',
  // [OPTIONAL] Set the path to your logo, default to '/logo.svg' if not specified
  // logo: 'https://example.com/logo.svg',
  // [OPTIONAL] Maintenance related settings
  maintenances: {
    // [OPTIONAL] The color of upcoming maintenance alerts, default to 'gray'
    // Active alerts will always use the color specified in the MaintenanceConfig
    upcomingColor: 'gray',
  },
  // [OPTIONAL] Custom footer html
  // customFooter: '',
}

const workerConfig: WorkerConfig = {
  // [Optional] Write KV at most every N minutes unless the status changed, default to 3
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    {
      id: 'pak.academy',
      name: 'Pak Academy Main Page',
      method: 'POST',
      target: 'http://pak.academy',
      tooltip: 'This is a tooltip for this monitor',
      statusPageLink: 'https://pak.academy',
      hideLatencyChart: false,
      headers: {
        'User-Agent': 'Uptimeflare',
      },
      body: 'Hello, world!',
    },
    {
      id: 'expat.food',
      name: 'Expat Food Main Page',
      method: 'POST',
      target: 'http://expat.food',
      tooltip: 'This is a tooltip for this monitor',
      statusPageLink: 'https://expat.food',
      hideLatencyChart: false,
      headers: {
        'User-Agent': 'Uptimeflare',
      },
      body: 'Hello, world!',
    },
    // Example TCP Monitor
    {
      id: 'test_tcp_monitor',
      name: 'Example TCP Monitor',
      // `method` should be `TCP_PING` for tcp monitors
      method: 'TCP_PING',
      // `target` should be `host:port` for tcp monitors
      target: '178.128.121.156:3370',
      tooltip: 'My production server SSH',
      statusPageLink: 'https://expat.food',
      timeout: 5000,
    },
  ],
  // [Optional] Notification settings
  notification: {
    // [Optional] Notification webhook settings, if not specified, no notification will be sent
    // More info at Wiki: https://github.com/lyc8503/UptimeFlare/wiki/Setup-notification
    webhook: {
      // [Required] webhook URL (example: Telegram Bot API)
      url: 'https://push.pak.academy/mywebhook',
      // [Optional] HTTP method, default to 'GET' for payloadType=param, 'POST' otherwise
      method: 'POST',
      // [Optional] headers to be sent
      headers: {
        Host: 'push.pak.academy',
	Title: 'Experiencing downtime..'
	Click: 'https://status.uwuu.space',
      },
      // [Required] Specify how to encode the payload
      // Should be one of 'param', 'json' or 'x-www-form-urlencoded'
      // 'param': append url-encoded payload to URL search parameters
      // 'json': POST json payload as body, set content-type header to 'application/json'
      // 'x-www-form-urlencoded': POST url-encoded payload as body, set content-type header to 'x-www-form-urlencoded'
      payloadType: 'x-www-form-urlencoded',
      // [Required] payload to be sent
      // $MSG will be replaced with the human-readable notification message
      payload: {
        //chat_id: 12345678,
        text: '$MSG',
      },
	body: 'Hi, hi, hi, hi, hi, how are you, what do you think? is everything ok? good to see <3'
      // [Optional] timeout calling this webhook, in millisecond, default to 5000
      timeout: 10000,
    },
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    timeZone: 'Asia/Shanghai',
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
    //gracePeriod: 5,
    // [Optional] disable notification for monitors with specified ids
    //skipNotificationIds: ['foo_monitor', 'bar_monitor'],
    // [Optional] suppress extra notifications for error reason changes during an incident, default to false
    skipErrorChangeNotification: true,
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any TypeScript code here
      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any TypeScript code here
    },
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
// const maintenances: MaintenanceConfig[] = []
const maintenances: MaintenanceConfig[] = [
  {
    // [Optional] Monitor IDs to be affected by this maintenance
    monitors: ['foo_monitor', 'bar_monitor'],
    // [Optional] default to "Scheduled Maintenance" if not specified
    title: 'Test Maintenance',
    // Description of the maintenance, will be shown at status page
    body: 'This is a test maintenance, server software upgrade',
    // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
    start: '2025-04-27T00:00:00+08:00',
    // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
    // if not specified, the maintenance will be considered as on-going
    end: '2025-04-30T00:00:00+08:00',
    // [Optional] color of the maintenance alert at status page, default to "yellow"
    color: 'blue',
  },
  // As this config file is a TypeScript file, you can even use IIFE to generate scheduled maintenances
  // The following example shows a scheduled maintenance from 2 AM to 4 AM on the 15th of every month (UTC+8)
  // This COULD BE DANGEROUS, as generating too many maintenance entries can lead to performance problems
  // Undeterministic outputs may also lead to bugs or unexpected behavior
  // If you don't know how to DEBUG, use this approach WITH CAUTION
  ...(function () {
    const schedules = []
    const today = new Date()

    for (let i = -1; i <= 1; i++) {
      // JavaScript's Date object will automatically handle year rollovers
      const date = new Date(today.getFullYear(), today.getMonth() + i, 15)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')

      schedules.push({
        title: `${year}/${parseInt(month)} - Test scheduled maintenance`,
        monitors: ['foo_monitor'],
        body: 'Monthly scheduled maintenance',
        start: `${year}-${month}-15T02:00:00.000+08:00`,
        end: `${year}-${month}-15T04:00:00.000+08:00`,
      })
    }
    return schedules
  })(),
]

// Don't forget this, otherwise compilation fails.
export { maintenances, pageConfig, workerConfig }

