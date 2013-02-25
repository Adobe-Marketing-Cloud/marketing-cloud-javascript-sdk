function OM_WSSE(u, s, n, c)
{
	this.set = function (u, s, n, c)
	{
		this.setUser(u);
		this.setSecret(s);
		this.setNonce(n);
		this.setCreated(c);
	};

	this.setUser = function (u)
	{
		this.u = u;
	};
	this.setSecret = function (s)
	{
		this.s = s;
	};
	this.setNonce = function (n)
	{
		this.n = n;
	};
	this.setCreated = function (c)
	{
		this.c = c;
	};

	this.generateNonce = function ()
	{
        var len = 24, chars  = "0123456789abcdef", nonce  = "";
        for (var i = 0; i < len; i++)
        {
            nonce += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return nonce;
	};

	this.generateCreated = function ()
	{
        var date = new Date(), y, m, d, h, i, s;
        y = date.getUTCFullYear();
        m = (date.getUTCMonth() + 1); if (m < 10) { m = "0" + m; }
        d = (date.getUTCDate());      if (d < 10) { d = "0" + d; }
        h = (date.getUTCHours());     if (h < 10) { h = "0" + h; }
        i = (date.getUTCMinutes());   if (i < 10) { i = "0" + i; }
        s = (date.getUTCSeconds());   if (s < 10) { s = "0" + s; }
        return y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + "Z";
    };

	this.encode = function ()
	{
		var p = {};
		if (!window.b64_sha1)
		{
			alert("b64_sha1() was not found");
			return p;
		}
		p.u = this.u;
		p.s = this.s;
		p.n = (this.n ? this.n : this.generateNonce());
		p.c = (this.c ? this.c : this.generateCreated());
		p.d = b64_sha1(p.n + p.c + p.s);
		p.n = base64encode(p.n);
		return p;
	};

	this.generateRESTHeaders = function ()
	{
		rval = "";

		var p = this.encode();

		rval = "UsernameToken";
        rval += " Username=\"" + p.u + "\",";
        rval += " PasswordDigest=\"" + p.d + "\",";
        rval += " Nonce=\"" + p.n + "\",";
        rval += " Created=\"" + p.c + "\"";

		return { 'X-WSSE': rval };
	};

	this.generateRESTQS = function ()
	{
		var p = this.encode(), rval = "";
		rval  = "auth_digest="    + escape(p.d);
        rval += "&auth_nonce="    + escape(p.n);
        rval += "&auth_created="  + escape(p.c);
        rval += "&auth_username=" + escape(p.u);
		return rval;
	};

	this.generateSOAPHeaders = function ()
	{
		var p = this.encode(), rval = "";

		rval  = "<wsse:Security wsse:mustUnderstand=\"1\" xmlns:wsse=\"http://www.omniture.com\">\n";
        rval += "\t<wsse:UsernameToken wsse:Id=\"User\">\n";
        rval += "\t\t<wsse:Username>" + p.u + "</wsse:Username>\n";
        rval += "\t\t\t<wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest\">" + p.d + "</wsse:Password>\n";
        rval += "\t\t<wsse:Nonce>" + p.n + "</wsse:Nonce>\n";
        rval += "\t\t<wsse:Created>" + p.c + "</wsse:Created>\n";
        rval += "\t</wsse:UsernameToken>\n";
        rval += "</wsse:Security>\n";

		return rval;
	};

	this.set(u, s, n, c);
}
