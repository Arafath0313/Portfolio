$baseUrl = "http://localhost:8080"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Spring Security & JWT Authentication Verification" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Public Endpoint Verification
Write-Host "1. Testing Public Endpoint (/api/v1/skills)..."
try {
    $pubResponse = Invoke-WebRequest -Uri "$baseUrl/api/v1/skills" -Method Get -UseBasicParsing
    if ($pubResponse.StatusCode -eq 200) {
        Write-Host "  [PASS] Public endpoint returned HTTP 200." -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Public endpoint returned HTTP $($pubResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "  [FAIL] Public endpoint call failed: $_" -ForegroundColor Red
}

# 2. Login Endpoint with Invalid Credentials
Write-Host "`n2. Testing Login with Invalid Credentials..."
$badLoginBody = @{
    username = "admin"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    $badLoginResponse = Invoke-WebRequest -Uri "$baseUrl/api/v1/auth/login" -Method Post -Body $badLoginBody -ContentType "application/json" -UseBasicParsing
    Write-Host "  [FAIL] Login with invalid credentials succeeded with status $($badLoginResponse.StatusCode)" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 401) {
        Write-Host "  [PASS] Login with invalid credentials returned HTTP 401 Unauthorized." -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Login returned HTTP ${statusCode} instead of 401: $_" -ForegroundColor Red
    }
}

# 3. Login Endpoint with Valid Credentials
Write-Host "`n3. Testing Login with Valid Credentials..."
$goodLoginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

$token = $null
try {
    $loginResponse = Invoke-WebRequest -Uri "$baseUrl/api/v1/auth/login" -Method Post -Body $goodLoginBody -ContentType "application/json" -UseBasicParsing
    if ($loginResponse.StatusCode -eq 200) {
        $json = $loginResponse.Content | ConvertFrom-Json
        $token = $json.data.token
        if ($token) {
            Write-Host "  [PASS] Login successful. JWT token extracted successfully." -ForegroundColor Green
        } else {
            Write-Host "  [FAIL] Token was not found in response data." -ForegroundColor Red
        }
    } else {
        Write-Host "  [FAIL] Login returned HTTP $($loginResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "  [FAIL] Login failed: $_" -ForegroundColor Red
}

# 4. Protected Endpoint without Token
Write-Host "`n4. Testing Protected Endpoint without Token (/api/v1/admin/skills/1)..."
try {
    $protNoToken = Invoke-WebRequest -Uri "$baseUrl/api/v1/admin/skills/1" -Method Get -UseBasicParsing
    Write-Host "  [FAIL] Protected endpoint succeeded without token: $($protNoToken.StatusCode)" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 401) {
        Write-Host "  [PASS] Protected endpoint without token returned HTTP 401 Unauthorized." -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Protected endpoint returned HTTP $statusCode instead of 401." -ForegroundColor Red
    }
}

# 5. Protected Endpoint with Invalid Token
Write-Host "`n5. Testing Protected Endpoint with Invalid Token..."
$headers = @{
    Authorization = "Bearer invalid_token_value"
}
try {
    $protBadToken = Invoke-WebRequest -Uri "$baseUrl/api/v1/admin/skills/1" -Headers $headers -Method Get -UseBasicParsing
    Write-Host "  [FAIL] Protected endpoint succeeded with invalid token: $($protBadToken.StatusCode)" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 401) {
        Write-Host "  [PASS] Protected endpoint with invalid token returned HTTP 401 Unauthorized." -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Protected endpoint returned HTTP $statusCode instead of 401." -ForegroundColor Red
    }
}

# 6. Protected Endpoint with Valid Token
Write-Host "`n6. Testing Protected Endpoint with Valid Token..."
if ($token) {
    $headers = @{
        Authorization = "Bearer $token"
    }
    try {
        $protGoodToken = Invoke-WebRequest -Uri "$baseUrl/api/v1/admin/skills/999" -Headers $headers -Method Get -UseBasicParsing
        Write-Host "  [FAIL] Protected endpoint unexpectedly succeeded: $($protGoodToken.StatusCode)" -ForegroundColor Red
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 404) {
            Write-Host "  [PASS] Protected endpoint accepted valid JWT token (successfully bypassed security) and returned HTTP 404 (Resource Not Found)." -ForegroundColor Green
        } elseif ($statusCode -eq 200) {
            Write-Host "  [PASS] Protected endpoint accepted valid JWT token and returned HTTP 200." -ForegroundColor Green
        } else {
            Write-Host "  [FAIL] Protected endpoint returned HTTP ${statusCode}: $_" -ForegroundColor Red
        }
    }
} else {
    Write-Host "  [SKIP] Skipping valid token check because login token was not generated." -ForegroundColor Yellow
}

# 7. Testing Swagger Docs Access
Write-Host "`n7. Testing Swagger Docs Endpoint (/swagger-ui/index.html)..."
try {
    $swaggerResponse = Invoke-WebRequest -Uri "$baseUrl/swagger-ui/index.html" -Method Get -UseBasicParsing
    if ($swaggerResponse.StatusCode -eq 200) {
        Write-Host "  [PASS] Swagger UI endpoint is publicly accessible." -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Swagger UI returned HTTP $($swaggerResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "  [FAIL] Swagger UI call failed: $_" -ForegroundColor Red
}
