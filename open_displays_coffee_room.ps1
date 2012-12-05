function Run_IE ([int]$resX, [int]$resY, [int]$shiftX, [string]$site_addr) {
	$ie = New-Object -ComObject InternetExplorer.Application
	$ie.Width = $resX
	$ie.Height = $resY
	$ie.Left = $shiftX
	$ie.Top = $false
	$ie.Fullscreen = $true
	$ie.ToolBar = $false
	$ie.StatusBar = $false
	$ie.Resizable = $false
	$ie.navigate2($site_addr)
	$ie.visible = $true
	$ie
}
$ie1 = Run_IE 1920 1080 0 "C:\inetpub\wwwroot\cct-coffee\4goals.html"
$ie2 = Run_IE 1920 1080 1920 "C:\inetpub\wwwroot\cct-coffee\5values.html"
$ie3 = Run_IE 1920 1080 3840 "C:\inetpub\wwwroot\cct-coffee\slide.html"
$ie4 = Run_IE 1920 1080 -192040 "C:\inetpub\wwwroot\cct-coffee\definition.html"