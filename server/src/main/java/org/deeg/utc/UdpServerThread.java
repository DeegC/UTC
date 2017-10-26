package org.deeg.utc;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.quinsoft.zeidon.ObjectEngine;
import com.quinsoft.zeidon.Task;

/**
 * Starts up a thread to listen on UDP port 4445.  When it recieves a UDP packet
 * it responds with the IP addresses.
 *
 * @author dgc
 *
 */
public class UdpServerThread extends Thread
{

    protected DatagramSocket socket     = null;
    protected boolean        listening = true;
    private final String addressList;
    private final Task   systemTask;

    public UdpServerThread( ObjectEngine oe ) throws IOException
    {
        super( "UDP Server" );

        systemTask = oe.getSystemTask();
        List<String> addresses = new ArrayList<>();

        Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
        Collections.list( interfaces )
                   .stream()
                   .forEach( iface -> {
                       Collections.list( iface.getInetAddresses() )
                                  .stream()
                                  .filter( ip -> ! ip.isLoopbackAddress() )
                                  .filter( ip -> ip instanceof Inet4Address )
                                  .forEach( ip -> addresses.add( ip.getHostAddress() ) );
                    } );

        addressList = StringUtils.join( addresses, "\n" );
        systemTask.log().info( "Addresses: \n" + addressList );
        socket = new DatagramSocket( 4445 );
    }

    @Override
    public void run()
    {

        while ( listening )
        {
            try
            {
                byte[] buf = new byte[ 2560 ];

                // receive request
                DatagramPacket packet = new DatagramPacket( buf, buf.length );
                socket.receive( packet );
                String str = new String( buf );
                systemTask.log().info( "UDP=> " + str );
                if ( str.startsWith( "KILL" ) )
                {
                    System.out.println( "Turning off UDP listen" );
                    listening = false;
                    break;
                }

                // Ignore packets without IPREQUEST
                if ( ! str.startsWith( "IPREQUEST" ) )
                    continue;

                buf = addressList.getBytes();

                // send the response to the client at "address" and "port"
                InetAddress address = packet.getAddress();
                int port = packet.getPort();
                packet = new DatagramPacket( buf, buf.length, address, port );
                socket.send( packet );
                systemTask.log().info( "UDP returned => " + addressList );
            }
            catch ( IOException e )
            {
                e.printStackTrace();
                listening = false;
            }
        }
        socket.close();
    }
}