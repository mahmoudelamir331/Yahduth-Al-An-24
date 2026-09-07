$serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHZmZWtjbGhkbHNpZGF5eG5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODAyOTU4NSwiZXhwIjoyMTAzNjA1NTg1fQ.aPyen-NJqlXYmdbhIudX-cphxPwuPF6DU9KJ4W2kebI"
$baseUrl = "https://cuxvfekclhdlsidayxnr.supabase.co/rest/v1"
$headers = @{
    "apikey" = $serviceKey
    "Authorization" = "Bearer $serviceKey"
}

Write-Host "=== ARTICLES TABLE (1 row) ===" -ForegroundColor Cyan
$resp = Invoke-RestMethod -Uri "$baseUrl/articles?limit=1&select=*" -Headers $headers -Method GET
$resp | ConvertTo-Json -Depth 5

Write-Host ""
Write-Host "=== SITE_SETTINGS TABLE ===" -ForegroundColor Cyan
$resp2 = Invoke-RestMethod -Uri "$baseUrl/site_settings?select=*" -Headers $headers -Method GET
$resp2 | ConvertTo-Json -Depth 5

Write-Host ""
Write-Host "=== CATEGORIES TABLE (3 rows) ===" -ForegroundColor Cyan
$resp3 = Invoke-RestMethod -Uri "$baseUrl/categories?limit=3&select=*" -Headers $headers -Method GET
$resp3 | ConvertTo-Json -Depth 5
